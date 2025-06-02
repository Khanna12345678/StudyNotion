import React from "react";
import Template from "../components/Auth/Template"
import signupImage from "../assets/Images/signup.webp";

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for Free"
      desc1="Build skills for today, tomorrow and beyond !"
      desc2="Education to future proof your career !"
      image={signupImage}
      formType="signup"
    ></Template>
  );
}

export default Signup;
