const nodemailer = require("nodemailer");
const sendMail = (subject, text, email, ) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // Define the email content
  const mailOptions = {
    from: "ymannor44@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.status(500).json({ message: "Failed to send reset link email" });
    } else {
      console.log("Email sent: " + info.response);
      return true
    }
  });
};
module.exports = { sendMail };
