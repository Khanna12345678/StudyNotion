import React from "react";
import ContactUsForm from "../reusable/ContactUsForm";

function ContactFormSection() {
  return (
    <div className="w-full flex flex-col items-center my-16 md:my-32">
      <div className="flex flex-col items-center mb-10">
        <h1 className="mb-1 text-richblack-25 text-3xl font-semibold ">
          Get in Touch
        </h1>
        <p className="text-richblack-300">
          We'd love to here from you, Please fill out this form.
        </p>
      </div>
      <div className="xl:w-[40%] w-11/12">
        <ContactUsForm />
      </div>
    </div>
  );
}

export default ContactFormSection;
