const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: `./dot.env` });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: `
        <p>Your verification code is:</p>
        <h2>${otp}</h2>
        <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendVerificationEmail;
