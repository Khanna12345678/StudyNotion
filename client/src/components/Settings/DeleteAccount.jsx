import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { deleteProfile } from "../../services/operations/settingsAPI";

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
  borderRadius:3
};
export default function DeleteAccount() {
  //for Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      ("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 md:px-12">
        <div className="md:flex hidden aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="md:text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="md:w-3/5 w-full text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300"
            onClick={handleOpen}
          >
            I want to delete my account.
          </button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="text-2xl font-semibold text-richblack-25">
              Confirm Account Deletion ?
            </div>
            <div className="text-sm text-richblack-300">All paid Courses Will Be Gone Forever !</div>
            <div className="flex w-full gap-4 mt-4">
              <button className="px-4 hover:scale-95 transition-all duration-200 ease-in-out py-2 bg-yellow-50 font-semibold text-black rounded-md" onClick={handleDeleteAccount}>Delete</button>
              <button className="text-richblack-25" onClick={()=>handleClose()}>Cancel</button>
            </div>
          </Box>
        </Modal>
        </div>
      </div>
    </>
  );
}
