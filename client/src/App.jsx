import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/navbar/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/Error";
import Contact from "./Pages/Contact";
import MyProfile from "./components/Dashboard.jsx/MyProfile";
import MySettings from "./components/Dashboard.jsx/MySettings";
import EnrolledCourses from "./components/Dashboard.jsx/EnrolledCourses";
import MyCourses from "./components/Dashboard.jsx/MyCourses";
import AddCourse from "./components/Dashboard.jsx/AddCourse";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/slices/authSlice";
import { setUser } from "./redux/slices/profileSlice";
import { resetCart } from "./redux/slices/cartSlice";
import HamburgerMenu from "./components/HamburgerMenu";
import Catalog from "./Pages/Catalog";
import CoursePage from "./Pages/CoursePage";
import Cart from "./components/Dashboard.jsx/Cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import ViewCourse from "./Pages/ViewCourse";
import PrivateRoute from "./components/Auth/PrivateRoute";
import VideoDetails from "./components/ViewCourse/VideoDetails";
import Instructor from "./components/Dashboard.jsx/instructorDashboard/InstructorDashboard";
import OpenRoute from "./components/Auth/OpenRoute";
import Category from "./components/Dashboard.jsx/Admin Dashboard/Category";

function App() {
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to logout user
    const logoutUser = () => {
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("token"); // Clear token from local storage
      localStorage.removeItem("user"); // Clear user from local storage
      navigate("/login");
    };

    const checkTokenExpiration = () => {
      if (!token) {
        // Token not found, logout user
        logoutUser();
        return;
      }

      try {
        const decodedToken = jwtDecode(token); // Decode token
        const currentTime = Date.now() / 1000; // Convert current time to seconds
        // (decodedToken)

        if (decodedToken.exp < currentTime) {
          // Token expired, logout user
          logoutUser();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logoutUser();
      }
    };

    // Periodically checking token expiration(every ten minute)
    const intervalId = setInterval(checkTokenExpiration, 600000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen relative w-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar open={open} setOpen={setOpen} />
        {open && <HamburgerMenu open={open} setOpen={setOpen} />}
        {!open && (
          <div className="pt-12">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/courses/:courseid" element={<CoursePage />} />
              <Route
                path="/catalog/:catalogname/:categoryid"
                element={<Catalog />}
              ></Route>
              <Route
                path="/login"
                element={
                  <OpenRoute>
                    <Login />
                  </OpenRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <OpenRoute>
                    <Signup />
                  </OpenRoute>
                }
              />
              <Route
                path="/verify-email"
                element={
                  <OpenRoute>
                    <VerifyEmail />
                  </OpenRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <OpenRoute>
                    <ForgotPassword />
                  </OpenRoute>
                }
              />
              <Route
                path="/update-password/:resetPasswordToken"
                element={
                  <OpenRoute>
                    <UpdatePassword />
                  </OpenRoute>
                }
              />
              <Route path="/viewcourse/:courseId" element={<ViewCourse />} />
              <Route
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                {user?.accountType === "student" && (
                  <>
                    <Route path="dashboard/cart" element={<Cart />} />
                    <Route
                      path="/dashboard/enrolled-courses"
                      element={<EnrolledCourses />}
                    />
                  </>
                )}
                {user?.accountType === "instructor" && (
                  <>
                    <Route
                      path="/dashboard/instructor"
                      element={<Instructor />}
                    />
                    <Route
                      path="/dashboard/my-courses"
                      element={<MyCourses />}
                    />
                    <Route
                      path="/dashboard/add-course"
                      element={<AddCourse />}
                    />
                  </>
                )}
                {
                  user?.accountType === "admin" && <Route path="/dashboard/create-category" element={<Category />} />
                }
                {/* <Route path="/dashboard/wishlist" element={<Wishlist />} /> */}
                <Route path="/dashboard/my-profile" element={<MyProfile />} />
                <Route path="/dashboard/my-settings" element={<MySettings />} />
              </Route>
              <Route
                element={
                  <PrivateRoute>
                    <ViewCourse />
                  </PrivateRoute>
                }
              >
                {user?.accountType === "student" && (
                  <>
                    <Route
                      path="viewcourse/:courseId/section/:sectionId/subsection/:subSectionId"
                      element={<VideoDetails />}
                    />
                  </>
                )}
              </Route>
              {/* 404 Page */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
