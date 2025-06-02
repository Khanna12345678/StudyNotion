import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        SENDOTP_API,
        {
          email,
        }
       
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (err) {
      toast.error(err.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      ("hi");
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async function (dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export function getPasswordResetToken(email,setEmailSent) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success('Reset Email Sent')
      setEmailSent(true);
    } catch (err) {
      toast.error(err.response.data.message)
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, resetPasswordToken,navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        resetPasswordToken,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password reset successfully");
      navigate("/login")
    } catch (error) {
      toast.error("Link Expired Try Again");
    }
    dispatch(setLoading(false));
  };
}
