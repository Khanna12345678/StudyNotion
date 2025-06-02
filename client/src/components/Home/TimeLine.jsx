import React from "react";
import CTAButton from "../reusable/CTAButton";

import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our Top Priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

function TimeLine() {
  return (
    <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto">
      <div className="flex flex-col md:flex-row gap-10 md:my-16 my-10">
        <div className="md:w-1/2 w-full text-3xl font-semibold md:text-4xl">
          Get the skills you need for a{" "}
          <span className="font-bold text-transparent bg-gradient-to-r from-[#3a79ff] to-[#30c5fa] bg-clip-text">
            Job that is in demand
          </span>
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-8 items-start">
          <div className="text-[#2C333F]">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </div>
          <CTAButton active={true} linkto={"/login"}>
            Learn More
          </CTAButton>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col w-full items-center justify-evenly mb-20">
        <div className="flex md:w-[40%] w-full flex-col mt-5 md:mt-0 md:gap-16 gap-10">
          {timeline.map((item, index) => (
            <div className="flex w-3/4 items-center" key={index}>
              <div className=" w-1/4 flex items-center justify-center">
                <div className="bg-white w-[45px] flex items-center text-[#2c333f] justify-center p-3 rounded-full">
                  <img src={item.logo} />
                </div>
              </div>
              <div className="w-3/4 flex flex-col">
                <h2 className="font-semibold text-[18px]">{item.heading}</h2>
                <p className="text-[14px] text-richblack-700 font-medium">
                  {item.Description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative w-full md:w-[60%] md:mt-0 mt-20">
          <img
            src={timelineImage}
            className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-md"
            alt=""
          />
          <div className="absolute bottom-[-10%] w-[82%] xl:w-[70%] md:w-[85%] left-[12%] rounded-md bg-caribbeangreen-700 text-white flex flex-row uppercase xl:py-10 md:py-4 py-3">
            <div className="flex flex-row xl:gap-5 md:gap-2 gap-3 items-center border-r border-caribbeangreen-300 px-5 xl:px-7">
              <p className="md:text-3xl text-base font-bold">10</p>
              <p className="text-caribbeangreen-300 md:text-sm text-[10px]">Years of experience</p>
            </div>
            <div className="flex flex-row md:gap-5 gap-3 items-center  px-7">
              <p className="md:text-3xl text-base font-bold">250</p>
              <p className="text-caribbeangreen-300 md:text-sm text-[10px]">types of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
