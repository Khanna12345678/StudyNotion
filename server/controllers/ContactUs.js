const { sendMailToMyself } = require("../utils/mailsender");

async function ContactUs(req, res) {
  try {
    const { message, phoneNo, lastname, firstname, email } = req.body;
    if (!email || !firstname || !message) {
      return res.status(400).json({
        success: false,
        message: "Fields Missing",
      });
    }

    const mailRes = await sendMailToMyself(email, firstname, message);
    if (mailRes.success === true) {
      return res.status(200).json({
        success: true,
        message: "Contact Form Submitted Successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: `Failed to send mail: ${mailRes.error}`,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to send mail",
    });
  }
}
module.exports = ContactUs;
