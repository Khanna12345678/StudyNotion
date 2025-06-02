import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ViewCourseSidebar from "../components/ViewCourse/ViewCourseSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCourseSectionData,
  setCompletedLectures,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../redux/slices/viewCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal";

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await getFullDetailsOfCourse(courseId, token);
        dispatch(setEntireCourseData(result?.courseDetails));
        dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
        dispatch(setCompletedLectures(result?.completedVideos));

        function calculateTotalLec(sections) {
          let total = sections?.reduce((acc, section) => {
            return acc + (section?.subSection.length || 0);
          }, 0);
          dispatch(setTotalNoOfLectures(total));
        }
        calculateTotalLec(result?.courseDetails?.courseContent);
      } catch (error) {
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  return (
    <div className="flex w-full relative h-full ">
      <div className="flex-shrink-0 fixed">
        <ViewCourseSidebar setReviewModal={setReviewModal} />
      </div>
      <div className="h-screen w-full ml-[320px]">
        <Outlet />
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}

export default ViewCourse;
