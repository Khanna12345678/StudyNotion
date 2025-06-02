const express = require("express");
const router = express.Router();

//middleware
const { auth, isInstructor} = require("../middlewares/auth");

//controllers
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard
} = require("../controllers/Profile");

// Delete User Account
router.delete("/deleteaccount", auth, deleteAccount);
router.put("/updateprofile", auth, updateProfile);
router.get("/getuserdetails", auth, getAllUserDetails);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

// Get Enrolled Courses
router.get("/getenrolledcourses", auth, getEnrolledCourses);
router.put("/updatedisplaypicture", auth, updateDisplayPicture);

module.exports = router;
