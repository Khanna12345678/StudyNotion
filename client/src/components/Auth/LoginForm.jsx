import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import {login} from "../../services/operations/authAPI"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }
  async function submitHandler(e) {
    e.preventDefault();
    dispatch(login(formData.email,formData.password,navigate))
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label htmlFor="email">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>{" "}
        </p>
      </label>
      <input
        className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
        required
        type="email"
        onChange={changeHandler}
        placeholder="Enter e-mail id"
        value={formData.email}
        id="email"
        name="email"
      />
      <label className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPass ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[10px] mt-4"
        />

        <span
          className="absolute right-3 top-[53px] cursor-pointer"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        <Link to="/forgot-password">
          <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-3 py-2 mt-4 hover:bg-yellow-500 hover:text-richblack-700 "
      >
        Sign-in
      </button>
    </form>
  );
}

export default LoginForm;
