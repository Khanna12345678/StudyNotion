import React from "react"

import Footer from "../components/Footer"
import ContactDetails from "../components/ContactUsPage/ContactDetails"
import ContactForm from "../components/ContactUsPage/ContactForm"
import ReviewSlider from "../components/reusable/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto md:mt-20 mt-10 flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-8 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact