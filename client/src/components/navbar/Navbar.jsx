import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "./ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

function Navbar({ open, setOpen }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [sublinks, setSublinks] = useState([]);

  useEffect(() => {
    async function caller() {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSublinks(result.data.data);
        // (sublinks)
      } catch (err) {
      }
    }
    caller();
  }, []);

  return (
    <div className="bg-richblack-800 fixed w-full z-60 flex items-center h-14 border-b-[1px] border-b-richblack-700">
      <div className="flex w-11/12  max-w-maxContent items-center justify-between mx-auto">
        <div>
          <Link to={"/"}>
            <img src={logo} width={160} height={60} loading="lazy" alt="logo" />
          </Link>
        </div>
        <nav>
          <ul className="hidden md:flex gap-5 items-center text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li key={index} className="text-white">
                {item?.title === "Catalog" ? (
                  <div className="relative hover:cursor-pointer flex items-center group">
                    <p>{item.title}</p>
                    <RiArrowDropDownLine size={25} />
                    <div
                      className="invisible  absolute left-[50%]
                      translate-x-[-50%] translate-y-[10%]
                   top-[50%]
                  flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-700
                  opacity-0 transition-all duration-200 group-hover:visible
                  group-hover:opacity-100 lg:w-[300px] z-20"
                    >
                      <div
                        className="absolute left-[50%] top-0
                  translate-x-[80%]
                  translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 z-20"
                      ></div>

                    {sublinks.length ? (
  sublinks.map((sublink, index) => (
    <Link
      to={`/catalog/${sublink?.name
        ?.split(" ")
        .join("-")
        .toLowerCase()
        .replace(/--+/g, "-")
        .trim()}/${sublink?._id}`}
      key={index}
    >
      <p className="my-2 hover:bg-richblack-200 px-4 hover:text-richblack-700 py-2 rounded-md font-semibold capitalize ">
        {sublink.name}
      </p>
    </Link>
  ))
) : (
  <div></div>
)}

                    </div>
                  </div>
                ) : (
                  <NavLink to={item?.path}>
                    <p>{item?.title}</p>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          {user && user.accountType !== "instructor" && user.accountType !== "admin" && (
            <Link to={"/dashboard/cart"} className="relative text-white">
              <AiOutlineShoppingCart size={25} className="relative z-0" />
              {totalItems > 0 ? (
                <span className="absolute z-10 top-[-10px] right-[-10px] text-white rounded-full text-sm px-[6px] bg-puregreys-400">
                  {totalItems}
                </span>
              ) : (
                <span></span>
              )}
            </Link>
          )}
          {token === null && (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <button className="px-3 text-richblack-25 border border-richblack-300 rounded-md py-1 bg-richblack-700 ">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="px-3 border border-richblack-300 rounded-md py-1 bg-richblack-700 text-richblack-25">
                  Signup
                </button>
              </Link>
            </div>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        <div className="text-xl flex gap-4 items-center cursor-pointer text-richblack-5 md:hidden ">
          {!open && user ? (
            <div
              onClick={() => navigate("/dashboard/my-profile")}
              className="overflow-hidden w-6 h-6 border rounded-full"
            >
              <img
                src={user?.image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          ) : null}
          {!open ? (
            <div className="flex items-center gap-4">
              {user && user.accountType !== "instructor" && (
                <Link to={"/dashboard/cart"} className="relative text-white">
                  <AiOutlineShoppingCart size={20} className="relative z-0" />
                  {totalItems > 0 ? (
                    <span className="absolute z-10 top-[-10px] right-[-10px] text-white rounded-full text-sm px-[6px] bg-puregreys-400">
                      {totalItems}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Link>
              )}
              <RxHamburgerMenu onClick={() => setOpen(true)} />
            </div>
          ) : (
            <IoCloseSharp onClick={() => setOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
