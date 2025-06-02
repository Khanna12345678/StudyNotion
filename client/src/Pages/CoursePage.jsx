import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import GetAvgRating from "../utils/averageRating";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import ConfirmationModal from "../components/reusable/Confirmationmodal";
import { IoIosGlobe } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import AbsoluteCourseCard from "../components/CoursePage/AbsoluteCourseCard";
import { IoVideocamOutline } from "react-icons/io5";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { StarRating } from "../components/StarComponent/Star";

function CoursePage() {
  //modal
  const [open, setOpen] = useState(false);
  const { courseid: courseId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState(null);
  const [rating, setRating] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [totalLectures, setTotalLectures] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourseFullDetails = async () => {
      setLoading(true);
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result?.data);
      } catch (error) {
        ("Could not fetch coursse details");
      }
      setLoading(false);
    };
    getCourseFullDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.ratingAndReviews);
    setRating(count);

    function calculateTotalLec(sections) {
      let total = sections?.reduce((acc, section) => {
        return acc + (section?.subSection.length || 0);
      }, 0);
      setTotalLectures(total);
    }
    calculateTotalLec(courseData?.courseContent);
    GetAvgRating();
  }, [courseData]);

  const handleBuyCourse = () => {
    if (user && user.accountType === "instructor") {
      toast.error("Instructor Cannot Buy");
      return;
    }
    if (token) {
      buyCourse(navigate, dispatch, [courseId], token, user);
      return;
    }

    setOpen(true);
    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return loading ? (
    <div className="text-3xl">Loading...</div>
  ) : (
    <div className="text-richblack-5">
      <div className="bg-richblack-800">
        <div className="py-8 relative px-4 w-10/12 mx-auto  ">
          <div className="w-3/4 ">
            <div className="flex text-sm gap-2 mb-6">
              <p
                onClick={() => navigate("/")}
                className=" cursor-pointer hover:underline"
              >
                Home{" "}
              </p>
              <p>/</p>
              <p>Catalog </p>
              <p>/</p>
              <p
                onClick={() =>
                  navigate(
                    `/catalog/${courseData?.category?.name}/${courseData?.category?._id}`
                  )
                }
                className="capitalize hover:underline cursor-pointer"
              >
                {courseData?.category?.name}
              </p>
              <p>/</p>
              <p className="text-yellow-50 capitalize cursor-pointer hover:underline">
                {courseData?.courseName}
              </p>
            </div>
            <div className="text-3xl font-semibold">
              {courseData?.courseName}
            </div>
            <div className="text-richblack-300 mb-2">
              {courseData?.courseDescription}
            </div>
            <div className="flex  gap-2 text-richblack-300">
              <div className="text-[#FFD60A]">{rating}</div>
              <div> 
                {/* <ReactStars
                  count={5}
                  edit={false}
                  value={rating}
                  onChange={()=>ratingChanged(value)}
                  size={24}
                  activeColor="#FFD60A"
                /> */}
                <StarRating rating={rating} />
              </div>
              <div className="">
                ({courseData?.ratingAndReviews?.length} Ratings)
              </div>
              <div>
                {courseData?.studentsEnrolled?.length} Students Enrolled
              </div>
            </div>
            <div className="mt-2 text-richblack-300">
              Created By - {courseData?.instructor?.firstName}{" "}
              {courseData?.instructor?.lastName}
            </div>
            <div className="flex items-center gap-2 text-richblack-300 mt-2">
              <IoIosGlobe />
              <div>English</div>
            </div>
          </div>
          <AbsoluteCourseCard
            setOpen={setOpen}
            setConfirmationModal={setConfirmationModal}
            user={user}
            courseData={courseData}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
      <div className="w-10/12 py-12 px-4 flex flex-col gap-8 mx-auto">
        <div className="w-[60%] border py-6 space-y-2  px-4 border-richblack-500 rounded-md">
          <h1 className="text-3xl font-semibold">What You'll Learn</h1>
          <p className="text-richblack-300">{courseData?.whatYouWillLearn}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Course Content</h1>
          <div className="flex items-center gap-2 text-richblack-300">
            <div>{courseData?.courseContent?.length} Sections</div>
            <div className="flex items-center">
              <div>
                <GoDotFill size={10} />
              </div>
              <div className="flex items-center">{totalLectures} Lectures</div>
            </div>
          </div>
        </div>

        <div className="rounded-lg w-[60%] bg-richblack-700 p-4">
          {courseData?.courseContent?.map((section) => (
            // Section Dropdown
            <details key={section._id} className="py-1" open>
              {/* Section Dropdown Content */}
              <summary className="flex cursor-pointer items-center justify-between pb-2 border-b-2 border-b-richblack-600 py-2">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                      {section?.sectionName}
                    </p>
                  </div>
                  <div className="text-sm text-richblack-200">
                    {section?.subSection?.length} Lecture
                  </div>
                </div>
              </summary>
              <div className="px-6 ">
                {/* Render All Sub Sections Within a Section */}
                {section?.subSection?.map((data, index) => (
                  <details
                    key={index}
                    className="flex cursor-pointer items-center justify-between gap-x-3 "
                  >
                    <summary className="flex items-center gap-x-3  border-b-2 border-b-richblack-600 py-2">
                      <IoVideocamOutline className="text-2xl text-richblack-50" />
                      <p className="font-semibold flex capitalize text-richblack-50">
                        {data?.title}
                        <IoMdArrowDropdown className="text-2xl text-richblack-50" />
                      </p>
                    </summary>
                    <div className="text-sm pl-6 py-2 capitalize text-richblack-200">
                      Summary : {data?.description}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <Footer />
      {confirmationModal && (
        <ConfirmationModal
          open={open}
          handleClose={() => setOpen(false)}
          modalData={confirmationModal}
        />
      )}
    </div>
  );
}

export default CoursePage;
