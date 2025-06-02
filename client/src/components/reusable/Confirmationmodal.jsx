import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const ConfirmationModal = ({ modalData, open, handleClose }) => {
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
  return (
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
          {modalData.text1}
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h8"
          component="h2"
          className="text-richblack-300"
        >
          {modalData.text2}
        </Typography>
        <div className="flex w-full gap-4 mt-4">
          <button
            className="px-4 hover:scale-95 transition-all duration-200 ease-in-out py-2 bg-yellow-50 font-semibold text-black rounded-md"
            onClick={() => modalData.btn1Handler()}
          >
            {modalData.btn1Text}
          </button>
          <button
            className="text-richblack-25"
            onClick={() => modalData.btn2Handler()}
          >
            {modalData.btn2Text}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
