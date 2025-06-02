import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/reusable/HighlightText";
import CTAButton from "../components/reusable/CTAButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/Home/CodeBlocks";
import gradientyellow from "../assets/Images/gradientyellow.svg";
import gradientblue from "../assets/Images/gradientblue.svg";
import TimeLine from "../components/Home/TimeLine";
import Footer from "../components/Footer";
import LearningLanguageSection from "../components/Home/LearningLanguageSection";
import InstructorSection from "../components/Home/InstructorSection";
import ExploreMore from "../components/Home/ExploreMore";
import ReviewSlider from "../components/reusable/ReviewSlider";

const Home = () => {
  return (
    <div className="w-full">
      {/* //section 1 */}
      <div className="relative w-11/12 mx-auto flex flex-col max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div className="md:mt-16 mt-8  p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex hover:bg-richblack-900 items-center px-10 py-[6px] gap-2 rounded-full transition-all duration-200">
              <p className="text-white">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="md:text-4xl text-3xl text-left md:text-center font-semibold mt-6">
          Empower Your Future With
          <HighlightText text={"Coding Skills"} />
        </div>
        <div className="mt-4 w-full md:w-[80%] text-left md:text-center text-base md:text-lg font-medium text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.{" "}
        </div>
        <div className="flex flex-row mt-8 gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="w-[90%] relative mb-8 mt-12 md:my-16 ">
          <div className="absolute w-full h-full bg-white top-2 left-2 md:top-4 md:left-4 z-10"></div>
          <video className="z-40 relative" muted loop autoPlay>
            <source src={banner} />
          </video>
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="md:text-4xl text-3xl leading-snug font-bold">
                Unlock Your{" "}
                <HighlightText text={"Coding Potential "}></HighlightText>
                With Our Online Courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              text: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{ text: "Learn More", linkto: "/login", active: false }}
            codeblock={`1. <!DOCTYPE html> \n2. <html> \n3. <head> \n4. <title>Study Notion</title> \n5. </head> \n6. <body> \n7. <h1 className="text-green-500">Learn New Coding Skills</h1> \n8. <p>From StudyNotion anytime , anywhere.</p> \n9. <nav><ahref="one/">One</a> <p> hello </p> \n10.  </body> \n11. </html>`}
            codeColor={`text-white`}
            gradientimg={gradientyellow}
          />
        </div>
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="md:text-5xl text-3xl leading-snug font-bold">
                Start{" "}
                <HighlightText text={"Coding In Seconds "}></HighlightText>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: "Continue Lesson",
              linkto: "/login",
              active: true,
            }}
            ctabtn2={{ text: "Learn More", linkto: "/login", active: false }}
            codeblock={`1. <!DOCTYPE html> \n2. <html> \n3. <head> \n4. <title>Study Notion</title> \n5. </head> \n6. <body> \n7. <h1 className="text-green-500">Learn Top Trending skills</h1> \n8. <p>From StudyNotion anytime , anywhere.</p> \n9. <nav><ahref="one/">One</a> <p> hello </p> \n10.  </body> \n11. </html>`}
            codeColor={`text-white`}
            gradientimg={gradientblue}
          />
        </div>
        <ExploreMore />
      </div>

      {/* Section 2 */}

      <div className="bg-puregreys-25 text-richblack-700 ">
        <div className="homepage_bg flex h-[150px] md:h-[300px]">
          <div className="w-11/12 max-w-maxContent flex justify-center items-center gap-5 mx-auto">
            <div className="flex gap-7 text-sm md:text-base text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-2 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
        <TimeLine />
        <LearningLanguageSection />
      </div>

      {/* //section3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col gap-24 my-10 items-center bg-richblack-900 text-white mb-8">
        <div>
          <InstructorSection />
        </div>
        <div>
          <h2 className="text-center text-4xl font-semibold">
            Review from Other Learners
          </h2>
          <ReviewSlider />
        </div>
      </div>

      {/* //footeer */}
      <Footer />
    </div>
  );
};

export default Home;
