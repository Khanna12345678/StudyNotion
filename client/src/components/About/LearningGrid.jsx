import React from "react";
import { LearningGridArray } from "../../data/learning-grid";
import HighlightText from "../reusable/HighlightText";
import CTAButton from "../reusable/CTAButton";

function LearningGrid() {
  return (
    <div className="grid mx-auto lg:w-10/12 w-full mt-10 md:mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-10">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 ?"md:col-span-2 p-4 pl-10 bg-transparent":"md:m-2 lg:m-0 m-4 rounded-xl md:rounded-md lg:rounded-none"} 
              ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
              ${card.order === 3 && "lg:col-start-2"}
              `}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="md:text-4xl text-3xl w-full md:w-9/12 text-richblack-25">
                    {card.heading}
                    <HighlightText text={card.highlightText} />
                  </div>
                  <p className=" w-full md:w-10/12 text-richblack-300">{card.description}</p>
                </div>
                <div className="lg:w-3/12 w-6/12 mb-10 md:mb-0">
                  <CTAButton active={true} linkTo={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 md:p-10 flex flex-col gap-8 min-h-fit md:min-h-[10rem] lg:min-h-[18rem]">
                <h1 className="text-xl font-bold text-richblack-25">{card.heading}</h1>
                <p className="text-richblack-300">{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LearningGrid;
