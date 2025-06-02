import React from "react";
import { useNavigate } from "react-router-dom";
import { IoShareSocialOutline } from "react-icons/io5";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function AbsoluteCourseCard({
  setOpen,
  user,
  courseData,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function handleShare() {
    copy(window.location.href);
    toast.success("Link Copied To Clipboard");
  }
  function ADDTOCART(course) {
    if (user && user?.accountType === "instructor") {
      toast.error("Instructor Cannot Buy");
      return;
    }
    if(user && user?.accountType === "admin"){
      toast.error("Admin Cannot Buy");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setOpen(true);
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "Login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  }
  return (
    <div className="absolute p-4 w-[350px] rounded-xl min-h-[400px] bg-richblack-700 right-0 top-10">
      <div className="w-full h-[180px] overflow-hidden rounded-md mb-4">
        <img
          className="w-full h-full object-cover"
          src={courseData?.thumbnail}
          alt="Course Thumbnail was Here"
        />
      </div>
      <div className="text-3xl font-semibold">Rs. {courseData?.price}</div>
      <div className="space-y-4 my-6">
        <button
          onClick={() => ADDTOCART(courseData)}
          className="w-full  transition-all duration-300 ease-in-out hover:shadow-xl text-center py-2 bg-yellow-100 text-black rounded-xl"
        >
          Add To Cart
        </button>
        <button
          className="bg-yellow-50  transition-all duration-300 ease-in-out hover:shadow-xl w-full rounded-xl py-2 text-center text-richblack-900"
          onClick={
            user &&
            courseData?.studentsEnrolled.some(
              (studentId) => studentId._id.toString() === user._id
            )
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user &&
          courseData?.studentsEnrolled.some(
            (studentId) => studentId._id.toString() === user._id
          )
            ? "Go to Course "
            : "Buy Now"}
        </button>
      </div>
      <div className="text-sm text-richblack-200 text-center">
        30 Day Money Back Guarentee
      </div>
      <div
        onClick={handleShare}
        className="flex text-black justify-center cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out hover:shadow-xl bg-yellow-50 w-1/2 mx-auto py-2 px-4 rounded-xl items-center gap-1 my-4"
      >
        {" "}
        <p>Share</p>
        <div>
          <IoShareSocialOutline />
        </div>
      </div>
    </div>
  );
}

export default AbsoluteCourseCard;
