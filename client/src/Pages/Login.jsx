import React from "react";
import Template from "../components/Auth/Template"
import loginImage from "../assets/Images/login.webp";

function Login() {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow and beyond !"
      desc2="Education to future proof your career !"
      image={loginImage}
      formType="login"
    ></Template>
  );
}

export default Login;
