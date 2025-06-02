import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import ProfileUpdate from "../Settings/ProfileUpdate";
import DeleteAccount from "../Settings/DeleteAccount";
import ChangeProfilePicture from "../Settings/ChangeProfilePicture";
import ChangePassword from "../Settings/ChangePassword";

function MySettings() {
  const navigate = useNavigate();

  return (
    <div className=" md:p-7 py-7 md:px-6 md:m-0 m-2 overflow-hidden md:overflow-visible flex flex-col gap-5 md:w-[70%] md:mx-auto">
      <div
        onClick={() => navigate("/dashboard/my-profile")}
        className="flex gap-2 items-center text-richblack-300 cursor-pointer"
      >
        <IoIosArrowBack />
        <p className="text-sm">Back</p>
      </div>
      <h1 className="text-3xl text-center font-bold tracking-wider text-richblack-5">
        Edit Profile
      </h1>
      <div className="md:min-w-[70%] max-w-[95%] mx-auto flex flex-col gap-3 ">
        <ChangeProfilePicture />
        <ProfileUpdate />
        <DeleteAccount />
        <ChangePassword />
      </div>
    </div>
  );
}

export default MySettings;
