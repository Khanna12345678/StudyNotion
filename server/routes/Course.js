// Import the required modules
const express = require("express");
const router = express.Router();

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourse,
  deleteCourse,
  getFullCourseDetails,
  updateCourseProgress,
  getCourseProgress,
  getInstructorCourses,
} = require("../controllers/Course");

//category controllers

const {
  createCategory,
  getAllCategories,
  categoryPageDetails,
  deleteCategory,
  editCategory
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
  createRatingAndReviews,
  getAvgRating,
  getAllRatingAndReviews,
  getCourseRatingAndReview,
} = require("../controllers/RatingAndReview");

// Importing Middlewares
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createcourse", auth, isInstructor, createCourse);
//update/edit course
router.put("/editcourse", auth, isInstructor, editCourse);
//delete Course
router.delete("/deletecourse", auth, isInstructor, deleteCourse);
//Add a Section to a Course
router.post("/createsection", auth, isInstructor, createSection);
// Update a Section
router.put("/updatesection", auth, isInstructor, updateSection);
// Delete a Section
router.delete("/deletesection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.put("/updatesubsection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.delete("/deletesubsection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/createsubsection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getallcourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getcoursedetails", getCourseDetails);

router.post("/getfullcoursedetails", auth, getFullCourseDetails);
router.post("/updateCourseProgress", auth, updateCourseProgress);
router.post("/getCourseProgress", auth, getCourseProgress);
router.post("/getReviews", getAllRatingAndReviews);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createcategory", auth, isAdmin, createCategory);
router.delete('/deleteCategory',auth,isAdmin,deleteCategory)
router.put('/editCategory',auth,isAdmin,editCategory)
router.get("/getallcategories", getAllCategories);
router.post("/getcategorypagedetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReviews);
router.get("/getAverageRating", getAvgRating);
router.get("/getReviews", getAllRatingAndReviews);
router.get("/getcoursereviews", getCourseRatingAndReview);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

module.exports = router;
