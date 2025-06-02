import React from "react";
import RenderSteps from "./RenderSteps";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditCourse, setStep } from "../../../redux/slices/courseSlice";

function AddCourse() {
  const dispatch = useDispatch();
  const { editCourse } = useSelector((state) => state.course);
  const navigate= useNavigate();
  function handleExit(){
    navigate('/dashboard/my-courses');
    dispatch(setEditCourse(false));
    dispatch(setStep(0));
  }
  return (
    <div className="text-richblack-5 md:p-6 py-6 px-4 w-full mx-auto">
      <button onClick={handleExit} className="text-sm text-richblack-300">Exit</button>
      <h1 className="text-3xl">{editCourse ? "Edit Course" : "Add Course"}</h1>
      <div className="flex mt-6 justify-between">
        <div className="md:w-8/12 w-full">
          <RenderSteps />
        </div>
        <div className="md:w-4/12 hidden md:block h-fit bg-richblack-800 rounded-xl p-4 mr-10">
          <div className="text-xl flex items-center gap-2 font-semibold">
            <AiTwotoneThunderbolt color="#CFAB08" />
            <p>Code Upload Tips</p>
          </div>
          <ul className="list-disc pl-4 mt-2 text-sm gap-2 flex flex-col text-richblack-200">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
