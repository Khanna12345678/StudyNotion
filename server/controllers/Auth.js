const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {mailSender} = require("../utils/mailsender");
const passwordUpdated = require("../mail/templates/passwordUpdate");

//send OTP
async function sendOTP(req, res) {
  try {
    //fetch email from req body
    const { email } = req.body;
    //check if user exist or not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }
    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp });
   
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }

    //creating entry in DB
    const otpBody = await OTP.create({
      email,
      otp,
    });

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

//signup controller

async function signup(req, res) {
  try {
    //data fetch from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    //validate data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Field Missing",
      });
    }
    //dono password ko match kerlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords Don't Match",
      });
    }
    //check user already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists , Please Login",
      });
    }
    //find most recent otp for user
    const response = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
     console.log(response);
    if (!response) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response.otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is Wrong",
      });
    }
    //if all good hash password and create entry in db and send success response
    const hashedPassword = await bcrypt.hash(password, 10);
    //entry create in Db

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
    });

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    //for handling spaces in URL
    const seed = `${firstName} ${lastName}`;
    const encodedSeed = encodeURIComponent(seed);





console.log("BRP");
console.log({
  firstName,
  lastName,
  email,
  password: 'hashed_password_hidden',
  accountType,
  additionalDetails: profileDetails._id,
  approved,
  image: `https://api.dicebear.com/8.x/initials/svg?seed=${encodedSeed}`,
});


















    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      approved: approved,
      //dicebear Api to Generate image from user 2 initial name letters
      image: `https://api.dicebear.com/8.x/initials/svg?seed=${encodedSeed}`,
    });
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
      console.log(err);
    return res.status(500).json({
      success: false,

      message: "User Cannot Be Registered , try Again",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    //check for empty Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Fields",
      });
    }

    //Check User Exists Or Not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't Exist Go SignUp",
      });
    }
    //If passwords are matching
    if (await bcrypt.compare(password, user.password)) {
      //create a token using jwt
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      user.token = token;
      user.password = undefined;
      res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        user,
        token,
      });
    }
    //If passwords are not matching
    else {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
}

async function changePassword(req, res) {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    ).populate("additionalDetails");
    
    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Update Confirmation",
        passwordUpdated(
          updatedUserDetails.email,
          `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      // ("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
}

module.exports = { changePassword, login, signup, sendOTP };
