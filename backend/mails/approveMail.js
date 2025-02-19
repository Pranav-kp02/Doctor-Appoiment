const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: `./dot.env` });

exports.sendApprovalEmail = async (userEmail, appoiment) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Appointment Approved ✅",
    html: `
        <h3>Your appointment has been approved! 🎉</h3>
        <p><strong>Doctor:</strong> ${appoiment.docData.fullName}</p>
        <p><strong>Date:</strong> ${appoiment.slotBookedDate}</p>
        <p><strong>Time:</strong> ${appoiment.slotBookedTime}</p>
        <p><strong>Fees:</strong> $${appoiment.fees}</p>
        <p>Please be on time for your appointment. Thank you!</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
