import React from "react";
import Instructor from "../../assets/Images/Instructor.png";
import HighlightText from "../reusable/HighlightText";
import CTAButton from "../reusable/CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col md:flex-row gap-20 items-center">
        <div className="md:w-[50%] relative  w-full">
          <div className="absolute w-full h-full bg-white top-4 left-4 z-10"></div>
          <img src={Instructor} alt="" className="relative shadow-white z-20" />
        </div>

        <div className="md:w-[50%] w-full flex flex-col gap-10">
          <div className="text-4xl font-semobold w-full md:w-[80%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
