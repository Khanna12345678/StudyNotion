const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

async function createSection(req, res) {
  try {
    //fetch data
    const { sectionName, courseId } = req.body;
    //validate data
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Fields Missing",
      });
    }
    const newSection = await Section.create({ sectionName });
    //add section entry in course courseContent array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      data: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Creating Section",
    });
  }
}

async function updateSection(req, res) {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Field Missing",
      });
    }
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );
    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Update Section successfull",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in Updating Section",
    });
  }
}

async function deleteSection(req, res) {
  try {
    const { sectionId, courseId } = req.body;
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "Field Missing",
      });
    }
    const deletedSection = await Section.findByIdAndDelete(sectionId, {
      new: true,
    });
    await SubSection.deleteMany({ _id: { $in: deletedSection.subSection } });
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { courseContent: deletedSection._id },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section Deleted successfully",
      data: updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting Section",
    });
  }
}

module.exports = { createSection, updateSection, deleteSection };
