const User = require("../models/User");
const Course = require("../models/Course");
const {mailSender} = require("../utils/mailsender");
const { createHmac } = require("node:crypto");
const instance = require("../config/razorpay");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentTemplate");
const paymentSuccessEmail = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

const sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;
  if (!orderId || !amount || !paymentId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide all fields",
    });
  }
  try {
    const user = await User.findById(userId);
    const mailRes = mailSender(
      user.email,
      "Payment Success",
      paymentSuccessEmail(user.firstName, amount / 100, orderId, paymentId)
    );
    return res.status(200).json({
      success: true,
      message: "Mail Sent",
      data: mailRes,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Couldn't send payment success mail",
    });
  }
};

async function capturePayment(req, res) {
  const { courses } = req.body;
  const userId = req.user.id;
  if (courses.length === 0) {
    return res.json({
      success: false,
      message: "Please Provide courseID",
    });
  }
  courses.map((course, index) => (index, course));
  let totalAmount = 0;
  for (const courseId of courses) {

    let course;
    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Couldn't Find Course",
        });
      }

      if (
        course?.studentsEnrolled?.some(
          (studentId) => studentId._id.toString() === courseId.toString()
        )
      ) {
        return res.status(500).json({
          success: false,
          ap: true,
          message: "Student is already enrolled",
        });
      }

      totalAmount += course?.price;
      // (typeof totalAmount);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Something Went Wrong in calculating total Amount",
      });
    }
  }
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  //order create
  try {
    const paymentResponse = await instance.orders.create(options);
   
    return res.status(200).json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Problem while creating Order",
    });
  }
}

//verify payment

async function verifySignature(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const courses = req.body.courses;
  const userId = req.user.id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Field missing",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  // const expectedSignature = crypto.hmac_sha256(
  //   body,
  //   process.env.RAZORPAY_SECRET
  // );

  if (expectedSignature === razorpay_signature) {
    //enroll student
    await enrollStudent(userId, courses, res);
    //return res
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Payment Failed",
    });
  }
}
const enrollStudent = async (userId, courses, res) => {
  if (!userId || !courses || !res) {
    return res.status(400).json({
      success: false,
      message: "Please provide data properly",
    });
  }
  for (const courseId of courses) {
    try {
      let course;
      course = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });
      // now give course to student
      const student = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId, courseProgress: courseProgress._id } },
        { new: true }
      );

      //send mail to children after successfull registeration

      const emailRes = await mailSender(
        student.email,
        `Successfully Enrolled in ${course.courseName}`,
        courseEnrollmentEmail(course.courseName, student.firstName)
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while assigning course to student",
      });
    }
  }
};

//capture payment and initiate the RazorPay order

// async function capturePayment(req, res) {
//   //get CourseID and userId
//   const { courseId } = req.body;
//   const userId = req.user.id;
//   //validation
//   if (!courseId) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide valid course ID",
//     });
//   }
//   let course;
//   try {
//     course = await Course.findById(courseId);
//     if (!courseId) {
//       return res.status(500).json({
//         success: false,
//         message: "Couldn't Find Course Details",
//       });
//     }
//     //checking If User has already Bought the Course , Check if UserId is present in Course students enrolled or not
//     const uid = new mongoose.Types.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res.status(500).json({
//         success: false,
//         message: "Student has already purchased this Course",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }

//   //if sab okay , then create order
//   const amount = course.price;
//   const currency = "INR";
//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString(),
//     //we passed these things in notes because later in verifySignature , when payment will get authorized then we need to give course to user so we will need courseId and UserId there , thats why we send these 2 details as notes.
//     notes: {
//       courseId,
//       userId,
//     },
//   };
//   try {
//     const paymentResponse = await instance.orders.create(options);
//     (paymentResponse);
//     return res.status(200).json({
//       success: true,
//       course: course.courseName,
//       description: course.courseDescription,
//       orderId: paymentResponse.id,
//       amount: paymentResponse.amount,
//       currency: paymentResponse.currency,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Couldnt initiate order",
//     });
//   }
// }

// async function verifySignature(req, res) {
//   //Secret present in backend(server)
//   const webhookSecret = "12345";
//   //Razorpay sends signature in this way only , No reasons
//   //this signature comes in encrypted format from razorpay and we cannot decrpyt it , so we encrypt our server's webHookSecret and then compare it with razorpay secret to confirm authenticity.
//   const signature = req.headers["x-razorpay-signature"];

//   //these are some necessary steps (Needed)
//   const shasum = crypto.createHmac("sha256", webhookSecret);
//   shasum.update(JSON.stringify(req.body));
//   //digest is final result
//   const digest = shasum.digest("hex");

//   if (signature === digest) {
//     ("payment authorized");

//     //now as signature is verified so give course to user
//     const { courseId, userId } = req.body.payload.payment.entity.notes;
//     try {
//       //2 step process:-
//       //insert userId in course Model studentsEnrolled array
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       );
//       if (!enrolledCourse) {
//         return res.status(500).json({
//           success: false,
//           message: "Course Not Found",
//         });
//       }
//       (enrolledCourse);
//       //insert CourseId in Course inside User Model
//       const enrolledStudent = await User.findByIdAndUpdate(
//         { _id: userId },
//         { $push: { courses: courseId } },
//         { new: true }
//       );
//       (addedCourse);
//       //All complete so send mail
//       const email = await mailSender(
//         enrolledStudent.email,
//         "Congratulations you are enrolled",
//         courseEnrollmentEmail(enrolledCourse.courseName,enrolledStudent.firstName)
//       );
//       (email);
//       //return res
//       return res.status(200).json({
//         success: true,
//         message: "Course Purchased Successfully",
//       });
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong when adding the courses",
//       });
//     }
//   } else {
//     return res.status(500).json({
//       success: false,
//       message: "Invalid Request",
//     });
//   }
// }

module.exports = { verifySignature, capturePayment, sendPaymentSuccessEmail };
