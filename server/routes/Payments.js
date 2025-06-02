const express = require("express");
const { capturePayment, verifySignature,sendPaymentSuccessEmail } = require("../controllers/Payments");
const router = express.Router();
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturepayment", auth, isStudent, capturePayment);
router.post("/verifysignature", auth, isStudent, verifySignature);
router.post('/sendPaymentSuccessEmail',auth,isStudent,sendPaymentSuccessEmail)

module.exports = router;
