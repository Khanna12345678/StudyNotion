import { React, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  width: 400,
  bgcolor: "#161d29",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.profile.user);
  return (
    <div className="flex items-center cursor-pointer text-white relative group">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src={user?.image} className="object-contain" alt="img" />
      </div>
      <RiArrowDropDownLine size={25} />
      <div
        className="invisible absolute left-[50%]
                      translate-x-[-55%] translate-y-[40%]
                   top-[50%]
                  flex flex-col gap-1 rounded-lg bg-richblack-5 p-2 text-richblack-5
                  opacity-0 transition-all duration-200 group-hover:visible
                  group-hover:opacity-100 lg:w-[150px] z-20"
      >
        <div
          className="absolute left-[50%] top-0
                  translate-x-[80%]
                  translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 z-20"
        ></div>
        <button
          onClick={() => navigate("/dashboard/my-profile")}
          className="px-4 py-2 rounded-md hover:bg-richblack-200 z-30 text-richblack-700 text-sm uppercase"
        >
          Dashboard
        </button>
        <button
          className="uppercase text-sm px-4 py-2 rounded-md hover:bg-richblack-200 text-richblack-700"
          onClick={handleOpen}
        >
          Logout
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-richblack-25"
            >
              Are you Sure
            </Typography>
            <div className="text-sm text-richblack-200">
              You will be Logged out of your Account ?
            </div>
            <div className="flex w-full gap-4 mt-4">
              <button
                className="px-4 hover:scale-95 transition-all duration-200 ease-in-out py-2 bg-yellow-50 font-semibold text-black rounded-md"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </button>
              <button
                className="text-richblack-25"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileDropdown;
