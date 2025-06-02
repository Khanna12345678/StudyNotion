import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast"
import { apiConnector } from "../../services/apiconnector";
import { CONTACT_US_API } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState, control } = useForm();

  const { errors, isSubmitSuccessful } = formState;

  const submitContactForm = async (data) => {
    // ("Logging Data", data);
    try {
      setLoading(true);
      const response = await apiConnector("POST", CONTACT_US_API, data);
      // ("Logging response", response);
      if(response?.data?.success){
        toast.success(`Mail Sent :)`)
      }
    } catch (error) {
      toast.error('Please Try Again')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitContactForm)}
        className="w-full text-richblack-100"
        noValidate
      >
        <div className="flex flex-col gap-8">
          <div className="flex gap-3">
            {/* firstName */}
            <div className="flex w-full flex-col">
              <label
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                autoComplete="off"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "First Name is Required",
                  },
                  minLength: {
                    value: 3,
                    message: "Must be minimum 2 length",
                  },
                })}
              />
              {errors.firstname && (
                <span className="text-red-600 text-sm mt-1">
                  {errors.firstname.message}
                </span>
              )}
            </div>

            {/* lastName */}
            <div className="flex flex-col w-full">
              <label
                htmlFor="lastname"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
              >
                Last Name
              </label>
              <input
                autoComplete="off"
                type="text"
                name="lastname"
                id="lastname"
                className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
                placeholder="Enter Last name"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
            >
              Email Address
            </label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              placeholder="Enter email Address"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm mt-1">
                Please enter your email address
              </span>
            )}
          </div>

          {/* phoneNo */}
          <div className="flex flex-col">
            <label
              className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
              htmlFor="phonenumber"
            >
              Phone Number
            </label>

            <div className="flex flex-row gap-3">
              {/* dropdown */}

              <select
                className="bg-richblack-800 rounded-md w-1/2"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code} - {element.country}
                    </option>
                  );
                })}
              </select>

              <input
                autoComplete="off"
                type="tel"
                name="phonenumber"
                id="phonenumber"
                placeholder="Enter Phone Number"
                className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px] "
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
              />
            </div>
            {errors.phoneNo && (
              <span className="text-red-600 text-sm mt-1">
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          {/* message */}
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"
            >
              Message
            </label>
            <textarea
              autoComplete="off"
              name="message"
              id="message"
              cols="30"
              className="bg-richblack-800 rounded-md text-richblack-5 w-full p-[10px]"
              rows="4"
              placeholder="Enter Your message here"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-red-600 text-sm mt-1">
                PLease enter your message.
              </span>
            )}
          </div>

          <button
          disabled={loading}
            type="submit"
            className="rounded-md bg-yellow-50 text-center px-6 py-2 text-[16px] font-semibold text-black"
          >
            {loading?"Sending...":"Send Message"}
          </button>
        </div>
      </form>
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default ContactUsForm;
