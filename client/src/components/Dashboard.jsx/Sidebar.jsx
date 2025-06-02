import { React, useState } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { logout } from "../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";

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

function Sidebar() {
  //for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  return (
    <div>
      <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 py-10 h-[calc(100vh-3rem)] bg-richblack-800">
        <div className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            if (link.type && link.type !== user.accountType) {
              return null;
            }
            return <SidebarLink key={link.id} link={link} />;
          })}
          <div className="w-11/12 mx-auto border-t-2 border-richblack-700"></div>
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                name: "Settings",
                icon: "VscSettingsGear",
                id: 7,
                path: "/dashboard/my-settings",
              }}
            />

            <button
              onClick={() => handleOpen()}
              className="text-sm font-medium px-8 py-2 flex gap-4 hover:text-yellow-50 text-white transition-all duration-200 ease-in-out rounded-md"
            >
              <div className="flex items-center gap-4">
                <VscSignOut size={20} />
                <span>Logout</span>
              </div>
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
                  Are you Sure ?
                </Typography>
                <div className="text-richblack-200 text-sm">
                  you will be Logged out of your Account ?
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
      </div>
    </div>
  );
}

export default Sidebar;
