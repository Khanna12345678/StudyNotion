const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { populate } = require("../models/OTP");
require("dotenv").config();

const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })
    console.log(courseDetails);

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

async function updateProfile(req, res) {
  try {
    const { firstName = "", lastName = "", dateOfBirth = "", gender, contactNumber, about = "" } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user.id

    // Validate required fields
    if (!userId || !contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields Required",
      });
    }

    // Find user by ID and populate additionalDetails
    const userDetails = await User.findById(userId).populate("additionalDetails");

    // If user not found, handle accordingly
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update user details
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    // Update or create additionalDetails
    if (userDetails.additionalDetails) {
      // If additionalDetails already exists, update it
      userDetails.additionalDetails.dateOfBirth = dateOfBirth;
      userDetails.additionalDetails.gender = gender;
      userDetails.additionalDetails.contactNumber = contactNumber;
      userDetails.additionalDetails.about = about;

      // Save updated additionalDetails
      await userDetails.additionalDetails.save();
    } else {
      // If additionalDetails doesn't exist, create and associate it
      const newAdditionalDetails = await Profile.create({
        dateOfBirth,
        gender,
        contactNumber,
        about,
      });

      // Associate newAdditionalDetails with userDetails
      userDetails.additionalDetails = newAdditionalDetails._id;
    }

    // Save updated userDetails
    await userDetails.save();

    // Populate additionalDetails in userDetails
    await userDetails.populate('additionalDetails');

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      userDetails,
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    return res.status(500).json({
      success: false,
      message: "Profile cannot be updated",
    });
  }
}

async function deleteAccount(req, res) {
  try {
    //get id
    const id = req.user.id;
    //validate
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Cannot Find a user with this Id",
      });
    }
    //delete profile model
    const profileId = userDetails.additionalDetails;
    const deletedProfile = await Profile.findByIdAndDelete(profileId);
    //deleting user id from course model (studentEnrolled array if user exists there)
    await Course.updateMany(
      { _id: { $in: userDetails.courses } },
      { $pull: { studentsEnrolled: id } }
    );

    //delete User model
    const deletedUser = await User.findByIdAndDelete(id);

    //send response
    return res.status(200).json({
      success: true,
      message: "Both user and its additional Details are Deleted From DB",
      deletedUser,
      deletedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Error Deleting Account",
    });
  }
}

async function getAllUserDetails(req, res) {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // (userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateDisplayPicture(req, res) {
  try {
    const file = await req.files.file;
    const userId = req.user.id;

    const response = await uploadImageToCloudinary(
      file,
      process.env.FOLDER_NAME
    );
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: response.secure_url },
      { new: true }
    ).populate("additionalDetails");
    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data:updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getEnrolledCourses(req, res) {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId).populate({
      path: "courses",
      populate: [
        {
          path: "category",
          model: "Category",
        },
        {
          path: "courseContent",
          model: "Section",
          populate: {
            path: "subSection",
            model:"SubSection"
          }
        },
        
        {
          path: "instructor",
          model: "User",
        },
      ],
    });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAllUserDetails,
  deleteAccount,
  updateProfile,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
};
