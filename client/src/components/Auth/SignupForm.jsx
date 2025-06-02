import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../redux/slices/authSlice";
import { sendOtp } from "../../services/operations/authAPI";

function SignUpForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const navigate = useNavigate();
  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }
  function submitHandler(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Don't Match");
    } else {
      const signupData = {
        ...formData,
        accountType,
      };
      dispatch(setSignupData(signupData));
      dispatch(sendOtp(formData.email, navigate));
    }
  }

  return (
    <div>
      <div className="p-1 flex gap-1 my-6 rounded-full  bg-richblack-800 max-w-max ">
        <button
          className={`${
            accountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200 ease-in`}
          onClick={() => {
            setAccountType("student");
          }}
        >
          Student
        </button>
        <button
          className={`${
            accountType === "instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200 ease-out`}
          onClick={() => {
            setAccountType("instructor");
          }}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
        {/* first and last name div */}
        <div className="flex gap-5">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter first name"
              value={formData.firstName}
            />
          </label>
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter last name"
              value={formData.lastName}
            />
          </label>
        </div>
        {/* email div */}
        <div>
          <label>
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Email <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter E-mail"
              value={formData.email}
            />
          </label>
        </div>
        {/* create and confirm password div */}
        <div className="flex gap-5">
          <label className=" w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              required
              type={showPass ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Create Password"
              value={formData.password}
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <AiOutlineEye></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] ">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px] "
              required
              type={showPass2 ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
            />
            <span
              className="absolute cursor-pointer right-3 bottom-4"
              onClick={() => {
                setShowPass2((prev) => !prev);
              }}
            >
              {showPass2 ? (
                <AiOutlineEye></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
              )}
            </span>
          </label>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-3 py-2 mt-4 hover:bg-yellow-500 hover:text-richblack-700 w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
