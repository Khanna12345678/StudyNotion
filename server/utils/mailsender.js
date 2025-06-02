const nodemailer = require("nodemailer");
require("dotenv").config();

var transport = nodemailer.createTransport({
  host:
    process.env.NODE_ENV === "dev"
      ? process.env.DEV_MAIL_HOST
      : process.env.MAIL_HOST,
  port: process.env.NODE_ENV === "dev" ? 2525 : 587,
  auth: {
    user:
      process.env.NODE_ENV === "dev"
        ? process.env.DEV_MAIL_USER
        : process.env.MAIL_USER,
    pass:
      process.env.NODE_ENV === "dev"
        ? process.env.DEV_MAIL_PASS
        : process.env.MAIL_PASS,
  },
});
async function mailSender(email, title, body) {
  try {
    let info = await transport.sendMail({
      from: '"StudyNotion 👻" <gaurangsaini01@gmail.com>', // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });
    // (info);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
async function sendMailToMyself(email, firstName, body) {
  try {
    let info = await transport.sendMail({
      from: email, // sender address
      to: "gaurangsaini01@gmail.com", // list of receivers
      subject: `Contact Form Submission from ${firstName}`, // Subject line
      text:`${body} Recieved From ${email}`, // html body
    });
    // (info);

    return { success: true, messageId: info.messageId };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

module.exports = { mailSender, sendMailToMyself };
