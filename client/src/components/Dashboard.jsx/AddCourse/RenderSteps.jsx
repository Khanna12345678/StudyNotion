import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CourseInformation from "./forms/CourseInformation";
import CourseBuilder from "./forms/CourseBuilder/CourseBuilderForm";
import PublishForm from "./forms/PublishForm";

function RenderSteps() {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div className="w-full  flex flex-col items-center">
      <Box sx={{ width: "90%" }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label.id}>
              <StepLabel>
                <div className="text-richblack-5">{label.title}</div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="md:w-11/12 w-full mx-auto mt-6">
        {step === 0 && <CourseInformation />}
        {step === 1 && <CourseBuilder />}
        {step === 2 && <PublishForm />}
      </div>
    </div>
  );
}

export default RenderSteps;
