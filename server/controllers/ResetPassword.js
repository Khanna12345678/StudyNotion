const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { mailSender } = require("../utils/mailsender.js");
const passwordReset = require("../mail/templates/passwordReset.js");
require("dotenv").config();

//resetPasswordToken
async function resetPasswordToken(req, res) {
  try {
    //get email from req body
    const email = req.body.email;
    //verify user exists or not with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: true,
        message: "Enter valid email",
      });
    }
    //token generate
    const resetPasswordToken = crypto.randomUUID();
    //update User with token and expire time in DB
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    //create URL
    const url = `${
      process.env.NODE_ENV === "prod"
      ? process.env.FRONTEND_URL_PROD
      : process.env.FRONTEND_URL_DEV
    }/update-password/${resetPasswordToken}`;
    //send mail
    const info = await mailSender(
      email,
      "Password Reset Email From StudyNotion",
      passwordReset(updatedDetails?.firstName, url)
    );
    //response send
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully , check email and change password from given link",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Couldn't Change Password , Sorry",
    });
  }
}
//resetPassword
async function resetPassword(req, res) {
  try {
    //fetch data
    const { password, confirmPassword, resetPasswordToken } = req.body;
    //validate data
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Field Missing",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password's Don't Match",
      });
    }

    const userDetails = await User.findOne({ resetPasswordToken });
    //token validate
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Token Invalid",
      });
    }
    //check if token expired
    if (userDetails.resetPasswordExpires <= Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    }

    //hash new password and update in DB (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { resetPasswordToken },
      { password: hashedPassword },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Cannot Change Password",
    });
  }
}

module.exports = { resetPassword, resetPasswordToken };
