const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//middleware to verify token

async function auth(req, res, next) {
  try {
    const token =
      // req.cookies.cookie ||
      // req.body.token 
      req.header("Authorization").split(" ")[1];

    //if token missing, then return response
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token Missing",
      });
    }
    //verify token if present
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //user me payload daldiya
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Some Token issue",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong while validating token",
    });
  } 
}
//middleware to check if user is student
async function isStudent(req, res, next) {
  try {
    if (req.user.accountType !== "student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for students only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cant be verified",
    });
  }
}

//middleware to check if user is instructor
async function isInstructor(req, res, next) {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for instructor only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cant be verified",
    });
  }
}

//middleware to check if user is admin
async function isAdmin(req, res, next) {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User role cant be verified",
    });
  }
}

module.exports = { auth, isStudent, isInstructor, isAdmin };