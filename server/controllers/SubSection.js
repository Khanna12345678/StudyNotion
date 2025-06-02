const SubSection = require("../models/SubSection.js");
const Section = require("../models/Section.js");
const {uploadImageToCloudinary} = require("../utils/imageUploader.js");
require("dotenv").config();

async function createSubSection(req, res) {
  try {
    //fetch data from req body
    const { timeDuration, title, description, sectionId } = req.body;
    //video
    const video = req.files.video;
    //validate
    if ( !title || !description || !video || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Field Missing",
      });
    }
    //upload to cloudinary video for getting URL
    // Check video size (assuming size is in bytes)
    if (video.size > 10 * 1024 * 1024) { // 10MB
      return res.status(400).json({
      success: false,
      message: "Video size should not exceed 10MB",
      });
    }

    const uploadedVideo = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    //create SubSection
    const newSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoURL: uploadedVideo.secure_url,
    });
    //updating Section with Subsection Id
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    ).populate("subSection");
    return res.status(200).json({
      success: true,
      message: "SubSection Created Successfully",
      data:updatedSection,
      newSubSection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

async function updateSubSection(req, res) {
  try {
    const { title, description, subSectionId, sectionId } = req.body;
    let video = req.body.video;

    // if (!title || !description || !subSectionId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Incomplete Fields",
    //   });
    // }

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Check if video is a URL or file
    if (req.files && req.files.video) {
      // Check video size (assuming size is in bytes)
      if (req.files.video.size > 10 * 1024 * 1024) { // 10MB
      return res.status(400).json({
        success: false,
        message: "Video size should not exceed 10MB",
      });
      }
      const uploadedVideo = await uploadImageToCloudinary(
      req.files.video,
      process.env.FOLDER_NAME,
      );
      subSection.videoURL = uploadedVideo.secure_url;
    } else if (video && !video.startsWith('http')) {
      // Handle case when video is not a valid URL
      return res.status(400).json({
      success: false,
      message: "Invalid video URL",
      });
    } else if (video) {
      subSection.videoURL = video;
    }

    if (title !== undefined) {
      subSection.title = title;
    }
    if (description !== undefined) {
      subSection.description = description;
    }

    await subSection.save();
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection: subSection,
      data: updatedSection,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


  async function deleteSubSection(req, res) {
    try {
      const { subSectionId, sectionId } = req.body;
      if (!subSectionId) {
        return res.status(400).json({
          success: false,
          message: "Field Missing",
        });
      }
      const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId, {
        new: true,
      });
  
      if (!deletedSubSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }
  
      const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        {
          $pull: { subSection: deletedSubSection._id },
        },
        { new: true }
      ).populate("subSection");
      return res.status(200).json({
        success: true,
        message: "SubSection Deleted successfully",
        data:updatedSection,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in deleting SubSection",
      });
    }
  }

  module.exports={createSubSection,updateSubSection,deleteSubSection}