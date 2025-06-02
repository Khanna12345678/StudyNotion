import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../components/reusable/IconBtn";

export default function ViewCourseSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    function work() {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section?._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((subsection) => subsection?._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    }
    work();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] fixed max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`);
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => {
                // navigate(
                //   `/viewcourse/${courseEntireData?._id}/section/${course?._id}/subsection/${course?.subSection[0]?._id}`
                // );
                setActiveStatus(course?._id);
                // setVideoBarActive(course?.subSection[0]?._id);
              }}
              //   onClick={() => setActiveStatus(course?._id)}
              key={course?._id}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    {course?.subSection.length} Lessons
                  </span>
                  <span
                    className={`${activeStatus === course?._id ? "rotate-0" : "rotate-180"
                      } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course?.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${videoBarActive === topic?._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/viewcourse/${courseEntireData?._id}/section/${course?._id}/subsection/${topic?._id}`
                        );
                        setVideoBarActive(topic?._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => { }}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
