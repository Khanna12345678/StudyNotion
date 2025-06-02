import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";
import EnrolledCourseCard from "./EnrolledCourseCard";

function EnrolledCourses() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white md:px-7 py-7 space-y-6 md:space-y-0 px-4">
      <div className="text-3xl font-bold">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p className="text-red-500 font-semibold text-2xl my-10">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div className="flex flex-col  w-full">
          <div className="md:flex hidden bg-richblack-700 my-6 pl-6 rounded-md py-4">
            <p className="w-1/2">Course Name</p>
            <div className="flex justify-between items-center w-full pr-20">
              <p className="">Category</p>
              <p className="">Instructor Name</p>
              <p>Progress</p>
            </div>
          </div>
          {/* Cards starting */}
          <div className="flex flex-col gap-6 md:pl-6">
            {enrolledCourses.map((course) => (
              <EnrolledCourseCard
                key={course._id}
                navigate={navigate}
                course={course}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
