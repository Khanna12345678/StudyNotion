import React from "react";
import frameImage from "../../assets/Images/frame.png";
import { FcGoogle } from "react-icons/fc";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

function Template({ title, desc1, desc2, image, formType}) {
  return (
    <div className="text-white mt-2 md:mt-10 w-11/12 flex flex-wrap max-w-[1110px] max-h-full py-9 mx-auto justify-between gap-20">
      <div className="lg:w-11/12 w-full mx-auto lg:max-w-[450px] ">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="text-blue-100 italic">{desc2}</span>
        </p>
        {formType === "signup" ? (
          <SignUpForm ></SignUpForm>
        ) : (
          <LoginForm ></LoginForm>
        )}
      </div>
      <div className="relative hidden lg:w-11/12 w-full lg:block lg:max-w-[450px]">
        <img src={frameImage} width={558} height={504} loading="lazy" />
        <img
          className="absolute -top-4 right-4"
          src={image}
          width={450}
          height={350}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Template;
