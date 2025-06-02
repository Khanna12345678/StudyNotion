const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
// const Course = require("../models/Course")

async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Field Missing",
      });
    }
    //create entry in DB
    const category = await Category.findOne({ name: name });
    if (category) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }
    const createdCategory = await Category.create({ name, description });
    //return response
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
      data: createdCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getAllCategories(req, res) {
  try {
    const getAllCategories = await Category.find({});
    return res.status(200).json({
      success: true,
      message: "All Categories returned Successfully",
      data: getAllCategories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function categoryPageDetails(req, res) {
  try {
    //get CategoryId
    const { categoryId } = req.body;
    //get all courses with that category
    const selectedCategoryCourses = await Category.findById(
      categoryId
    ).populate({
      path: "courses",
      match: { status: "published" },
      populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
    });
    //validate if there is no category of such type
    if (!selectedCategoryCourses) {
      return res.status(401).json({
        success: false,
        message: "No  such Category",
      });
    }

    // Handle the case when there are no courses
    //  if (selectedCategoryCourses.courses.length === 0) {
    //   ("No courses found for the selected category.")
    //   return res.status(200).json({
    //     success: true,
    //     message: "No courses found for the selected category.",
    //     data:selectedCategoryCourses
    //   })
    // }

    //get courses for different categories
    const differentCategoryCourses = await Category.find({
      _id: { $ne: categoryId },
    }).populate({
      path: "courses",
      match: { status: "published" },
      populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
    });
    // get top Selling Courses
    // const topSellingCourses =await Course.aggregate([
    //     {$match:}
    // ])
    // return all 3 types of courses
    return res.status(200).json({
      success: true,
      message: "All Retrieved",
      data: {
        selectedCategoryCourses,
        differentCategoryCourses,
        // topSellingCourses
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Cannot get category page details",
    });
  }
}
async function deleteCategory(req, res) {
  try {
    const categoryId = req.body.categoryId;
    const category = await Category.findById(categoryId).populate("courses");
    const courses = category.courses;
    for (const course of courses) {
      const studentsEnrolled = course.studentsEnrolled;
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: course._id },
        });
      }

      // Delete sections and sub-sections
      const courseSections = course.courseContent;
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId);
        if (section) {
          const subSections = section.subSection;
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId);
          }
        }
        // Delete the section
        await Section.findByIdAndDelete(sectionId);
      }
      await Course.findByIdAndDelete(course.id);
      await User.findByIdAndUpdate(course.instructor, {
        $pull: { courses: course.id },
      });
    }
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Error deleting category",
    });
  }
}

async function editCategory(req, res) {
  try {
    const { categoryId, name, description } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "No id provided",
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name:name,
        description:description,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Updated category successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some internal error in editing category",
    });
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  categoryPageDetails,
  deleteCategory,
  editCategory,
};
