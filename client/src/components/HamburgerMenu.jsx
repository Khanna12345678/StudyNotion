import React from "react";
import { NavbarLinks } from "../data/navbar-links";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
import {HamSidebarLinks} from "../data/HamburgerMenuLinks"
function HamburgerMenu({ open, setOpen }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout(navigate));
    setOpen(false);
  }
  function handleSetting() {
    setOpen(false);
    navigate("/dashboard/my-settings");
  }
  return (
    <div
      className={`w-full flex flex-col justify-between  mt-14 absolute inset-0 z-50 bg-richblack-800 ${
        open ? "animate-slide-in" : "animate-slide-out"
      }`}
    >
      <div className="text-white uppercase flex flex-col items-center mt-3">
        <div className="w-full">
          {NavbarLinks.map((link, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div
                className={`w-11/12 h-[0.1px] bg-richblack-500 ${
                  index === 0 || index === 1 ? "hidden" : ""
                } my-4`}
              ></div>
              <NavLink
                to={link?.path}
                onClick={() => setOpen(false)}
                className={`w-full items-center flex py-1 px-4 text-2xl ${
                  index === 1 ? "hidden" : ""
                }`}
              >
                {link?.title}
              </NavLink>
            </div>
          ))}
          <div
            className={`w-11/12 h-[0.1px] mx-auto bg-richblack-500 my-4`}
          ></div>
          <div className="text-2xl px-4">Catalog</div>
        </div>
        {user
          ? HamSidebarLinks.map((sidebar, index) => {
              if (sidebar.type && sidebar.type !== user.accountType) {
                return null;
              } else {
                return (
                  <>
                    <div
                      className={`w-11/12 h-[0.1px] bg-richblack-500 my-4`}
                    ></div>
                    <NavLink
                      key={index}
                      to={sidebar?.path}
                      onClick={() => setOpen(false)}
                      className={`w-full items-center justify- flex py-1 px-4 text-2xl`}
                    >
                      {sidebar?.name}
                    </NavLink>
                  </>
                );
              }
            })
          : null}
      </div>
      {/* <div className={`w-11/12 h-[0.1px] bg-richblack-500 my-4 mx-auto`}></div> */}
      {!token && (
        <div className="flex flex-col gap-4 mb-4">
          <Link to="/login">
            <div
              onClick={() => setOpen(false)}
              className="bg-richblack-5 text-black text-center w-11/12 rounded-xl mx-auto text-xl font-semibold hover:scale-95 transition-all duration-300 ease-in-out  py-4"
            >
              Login
            </div>
          </Link>
          <Link to={"/signup"}>
            <div
              onClick={() => setOpen(false)}
              className="px-3 mx-auto text-xl font-semibold hover:scale-95 transition-all duration-300 ease-in-out w-11/12 py-4 text-center border-richblack-300  bg-richblack-700 rounded-xl text-richblack-25"
            >
              Signup
            </div>
          </Link>
        </div>
      )}
      {token && (
        <div className="flex flex-col gap-4 mb-4">
          <div
            onClick={handleSetting}
            className="px-3 mx-auto text-xl font-semibold hover:scale-95 transition-all duration-300 ease-in-out w-11/12 py-4 text-center border-richblack-300 cursor-pointer bg-richblack-700 rounded-xl text-richblack-25"
          >
            Settings
          </div>
          <div
            onClick={handleLogout}
            className="bg-richblack-5  text-black text-center w-11/12 rounded-xl mx-auto text-xl font-semibold hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer py-4 "
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
