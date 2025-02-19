require("dotenv").config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Function to send appointment email reminder
function sendAppointmentReminder(
  userData,
  docData,
  slotBookedDate,
  slotBookedTime
) {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: userData.email,
    subject: "Appointment Reminder",
    text: `Dear ${userData.fullName},

This is a reminder for your doctor's appointment with ${docData.name} on ${slotBookedDate} at ${slotBookedTime}.

Please ensure you arrive on time.

Best regards,
Your Clinic`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

exports.scheduleAppointmentReminder = (appointment) => {
  if (appointment.isCancelled) {
    console.log(
      `Appointment for ${appointment.userData.fullName} is cancelled. No reminder will be sent.`
    );
    return;
  }

  const appointmentDateObj = new Date(appointment.slotBookedDate);
  const day = appointmentDateObj.getDate();
  const month = appointmentDateObj.getMonth() + 1; // JS months are 0-based

  const cronExpression = `0 9 ${day} ${month} *`; // Runs at 9 AM on `slotBookedDate`

  const job = cron.schedule(cronExpression, () => {
    sendAppointmentReminder(
      appointment.userData,
      appointment.docData,
      appointment.slotBookedDate,
      appointment.slotBookedTime
    );
    job.stop();
  });
};
