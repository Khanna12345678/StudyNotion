// const BASE_URL = import.meta.env.VITE_APP_MODE==='dev'? import.meta.env.VITE_APP_BASE_URL:import.meta.env.VITE_APP_RENDER_URL;
const BASE_URL= "http://localhost:3000/api/v1"
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/getallcategories",
  CREATE_CATEGORY_API: BASE_URL + "/course/createcategory",
  DELETE_CATEGORY_API:BASE_URL + '/course/deleteCategory',
  EDIT_CATEGORY_API:BASE_URL + '/course/editCategory'
};

// Rating and review
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/SOTP",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

export const CONTACT_US_API = BASE_URL + "/reach/contact";

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedisplaypicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteaccount",
};

export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getenrolledcourses",
  GET_INSTRUCTOR_DATA_API:BASE_URL+'/profile/instructorDashboard'
};

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getallcourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getcoursedetails",
  EDIT_COURSE_API: BASE_URL + "/course/editcourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/getallcategories",
  CREATE_COURSE_API: BASE_URL + "/course/createcourse",
  CREATE_SECTION_API: BASE_URL + "/course/createsection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/createsubsection",
  UPDATE_SECTION_API: BASE_URL + "/course/updatesection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updatesubsection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deletesection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deletesubsection",
  DELETE_COURSE_API: BASE_URL + "/course/deletecourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getfullcoursedetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getcategorypagedetails",
  COURSE_PROGRESS_API:BASE_URL+'/course/getCourseProgress'
};

export const studentEndPoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturepayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifysignature",
  PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendpaymentsuccessfullemail",
};
