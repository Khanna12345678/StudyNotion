import toast from "react-hot-toast";
import { studentEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";
const { COURSE_PAYMENT_API, COURSE_VERIFY_API, PAYMENT_SUCCESS_EMAIL_API } =
  studentEndPoints;
import { setPaymentLoading } from "../../redux/slices/courseSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import LogoSmallDark from "../../assets/Logo/Logo-Small-Dark.png"

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    const result = await apiConnector(
      "POST",
      PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
  }
}
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment");
  dispatch(setPaymentLoading(true));
  try {
    const result = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!result?.data?.success) {
      throw new Error(result?.data?.message);
    }
    toast.success("Enrolled Successfully !");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (err) {
    toast.error("Couldn't Verify");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

export async function buyCourse(
  navigate,
  dispatch,
  courses,
  token,
  userDetails
) {
  (token);
  const toastId = toast.loading("Buying...");
  try {
    //load the script
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      toast.error("RazorPay Error");
    }
  
    //initiate the order
    const orderRes = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  

    if(orderRes?.data?.ap){
      toast.error('User Already enrolled')
      return;
    }

    if (!orderRes?.data?.success) {
      throw new Error(orderRes?.data.message);
    }
  
    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY,
      currency: orderRes?.data?.message?.currency,
      amount: orderRes?.data?.message?.amount,
      order_id: orderRes?.data?.message?.id,
      name: "StudyNotion",
      description: "Thank You For purchasing course",
      image:LogoSmallDark,
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
      },
      handler: function (response) {
        //email for successfull Mail sent
        sendPaymentSuccessEmail(
          response,
          orderRes?.data?.message?.amount,
          token
        );
        //verifying payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("oops, payment failed");
      (response.error);
    });
  } catch (err) {
  
    toast.error("Already Purchased");
  }
  toast.dismiss(toastId);
}
