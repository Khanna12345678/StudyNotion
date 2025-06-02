import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { getCourseProgress } from "../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";

function EnrolledCourseCard({ course, navigate }) {
  const { token } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  

  useEffect(() => {
    async function getProgress() {
      const completedLectures = await getCourseProgress(
        { courseId: course._id },
        token
      );

      let totalLectures = course?.courseContent?.reduce((acc, section) => {
        return acc + (section?.subSection.length || 0);
      }, 0);
      setProgress((completedLectures / totalLectures) * 100);
    }
    getProgress();
  }, []);

  return (
    <div className="flex md:flex-nowrap flex-wrap items-center">
      <div
        onClick={() =>
          navigate(
            `/viewcourse/${course._id}/section/${course?.courseContent?.[0]._id}/subsection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
          )
        }
        className="cursor-pointer flex gap-4 md:w-1/2 w-full items-center"
      >
        <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
          <img
            className="h-full w-full object-contain"
            src={course.thumbnail}
          />
        </div>
        <div className="flex gap-1 flex-col">
          <p>{course.courseName}</p>
          <p className="text-sm text-richblack-300">
            {course?.courseDescription?.length > 30 ? `${course?.courseDescription?.substring(0,65)}...` : course.courseDescription}
          </p>
        </div>
      </div>
      <div className="flex w-full md:flex-row flex-col md:gap-0 gap-1 md:mt-0 mt-2 justify-between items-start md:items-center">
        <div className="text-sm md:w-2/3 text-richblack-200">
          {course?.category?.name}
        </div>
        <div className="text-sm flex md:w-1/2 items-center gap-2 text-richblack-200">
          <div className="md:hidden block">Instructor : </div>{course?.instructor?.firstName}
        </div>
        <div className="min-w-[250px] flex flex-col gap-2">
          <div className="text-sm text-richblack-200">
            Progress : {progress}%
          </div>
          <ProgressBar
            height="10px"
            bgColor="#2274cd"
            baseBgColor="#d9d9d9"
            isLabelVisible={false}
            completed={progress}
          />
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;
