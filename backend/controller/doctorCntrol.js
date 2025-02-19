const Doctor = require("../modules/doctorShema");
const bcrypt = require("bcrypt");
const { genToken } = require("../utils/genToken");
const APPOIMENT = require("../modules/appoimentSchema");
const User = require("../modules/userSchema");
const { scheduleAppointmentReminder } = require("../mails/sendReminderMails");
const { sendApprovalEmail } = require("../mails/approveMail");

exports.docRegister = async (req, res) => {
  const {
    fullName,
    email,
    password,
    speciality,
    degree,
    experience,
    about,
    available,
    fees,
    address,
    date,
  } = req.body;

  if (
    (!fullName,
    !email,
    !password,
    !speciality,
    !degree,
    !experience,
    !about,
    !available,
    !fees)
  ) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  const hassPass = await bcrypt.hash(password, 10);

  const imagePath = req.file ? req.file.path : null;

  try {
    const doctor = await Doctor.create({
      fullName,
      email,
      password: hassPass,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      date,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: " Doctor Register successs",
      doctor,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.docLogin = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  try {
    const genPass = await Doctor.findOne({ email, role: "Doctor" });
    if (!genPass) {
      return res.status(400).json({
        sucess: false,
        message: "Not authroized",
      });
    }

    const isMatch = bcrypt.compare(password, genPass.password);
    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "incorrect email/password",
      });
    }

    const doctorData = {
      id: genPass.id,
      fullName: genPass.fullName,
      email: genPass.email,
      role: genPass.role,
      speciality: genPass.speciality,
      degree: genPass.degree,
      experience: genPass.experience,
      available: genPass.available,
      about: genPass.about,
      fees: genPass.fees,
      image: genPass.image,
    };

    req.genPass = doctorData;

    genToken(req, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.docProfile = async (req, res) => {
  const dId = req.id;
  const { docId } = req.params;

  if (dId !== docId) {
    return res.status(401).json({
      success: false,
      message: "not have permission",
    });
  }
  if (!dId) {
    return res.status(400).json({
      sucess: false,
      message: "doctor inValid",
    });
  }

  const doctor = await Doctor.findById(docId);
  if (!doctor) {
    return res.status(400).json({
      sucess: false,
      message: "doctor inValid",
    });
  }
  const {
    _id,
    fullName,
    email,
    speciality,
    degree,
    experience,
    about,
    available,
    fees,
    address,
    date,
    image,
  } = doctor;
  res.status(201).json({
    success: true,
    doctor: {
      _id,
      fullName,
      email,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
      date,
      image,
    },
  });
};

exports.docUpdate = async (req, res) => {
  const dId = req.id;
  const { docId } = req.params;

  if (dId !== docId) {
    return res.status(401).json({
      success: false,
      message: "not have permission",
    });
  }

  if (!dId) {
    return res.status(400).json({
      sucess: false,
      message: "doctor inValid",
    });
  }

  const {
    fullName,
    email,
    speciality,
    degree,
    experience,
    about,
    available,
    fees,
  } = req.body;
  if (
    (!fullName,
    !email,
    !speciality,
    !degree,
    !experience,
    !about,
    !available,
    !fees)
  ) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  const doctor = await Doctor.findById(docId);
  if (!doctor) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  // const hassPass = await bcrypt.hash(password, 10);

  doctor.fullName = fullName;
  doctor.email = email;
  (doctor.speciality = speciality),
    (doctor.degree = degree),
    (doctor.experience = experience),
    (doctor.about = about),
    (doctor.available = available),
    (doctor.fees = fees);

  const updateDoctor = await doctor.save();

  res.status(201).json({
    success: true,
    message: "updated successfully",
    doctor: {
      id: updateDoctor._id,
      fullName: updateDoctor.fullName,
      email: updateDoctor.email,
      speciality: updateDoctor.speciality,
      degree: updateDoctor.degree,
      experience: updateDoctor.experience,
      about: updateDoctor.about,
      available: updateDoctor.available,
      fees: updateDoctor.fees,
    },
  });
};

exports.docDelete = async (req, res) => {
  const dId = req.id;
  const { docId } = req.params;

  if (dId !== docId) {
    return res.status(401).json({
      success: false,
      message: "not have permission",
    });
  }

  if (!dId) {
    return res.status(400).json({
      sucess: false,
      message: "Doctor inValid",
    });
  }

  const doctor = await Doctor.findByIdAndDelete(docId);
  if (!doctor) {
    return res.status(400).json({
      sucess: false,
      message: "Doctor inValid",
    });
  }

  res.status(201).json({
    success: true,
    message: "deleted successfully",
  });
};

exports.veiwAllDoctors = async (req, res) => {
  const doctors = await Doctor.find({ role: "Doctor", available: true }).select(
    "-password" && "-slots_booked"
  );

  if (!doctors || doctors.length === 0) {
    return res.status(404).json({
      succes: false,
      message: "No Doctors Found",
    });
  }

  return res.status(200).json({
    success: true,
    doctors,
  });
};

exports.docPendingAppoiment = async (req, res) => {
  const docId = req.id;

  const appoiment = await APPOIMENT.find({
    doctorId: docId,
    status: "pending",
  });
  if (!appoiment || appoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No pending appoiment",
    });
  }

  return res.status(200).json({
    success: true,
    appoiment,
  });
};

exports.updatePendingAppoiment = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(404).json({
        success: true,
        message: "enter status",
      });
    }

    if (!appId) {
      return res.status(404).json({
        success: true,
        message: "Appoiment not Found",
      });
    }

    const appoimentPend = await APPOIMENT.findById(appId);

    if (!appoimentPend) {
      return res.status(404).json({
        success: true,
        message: "Appoiment not Found",
      });
    }

    appoimentPend.status = status;
    appoimentPend.save();
    res.status(200).json({
      success: true,
      message: "Status updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.doctorAllAppoiment = async (req, res) => {
  const docId = req.id;
  const allAppoiment = (await APPOIMENT.find({ doctorId: docId })).reverse();
  if (!allAppoiment || allAppoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiments Found",
    });
  }
  return res.status(200).json({
    success: true,
    allAppoiment,
  });
};

exports.docCancelAppoiment = async (req, res) => {
  const { AppoimentId } = req.params;
  const { cancel } = req.body;
  const { status } = req.body;
  const { bookDate } = req.body;
  const { bookTime } = req.body;
  if (!AppoimentId) {
    return res.status(401).json({
      success: false,
      message: "Appoiment not found",
    });
  }

  const appoiment = await APPOIMENT.findById(AppoimentId);
  if (!appoiment || appoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiment yet",
    });
  }

  const doctor = await Doctor.findById(appoiment.doctorId);

  const updatedSlots = doctor.slots_booked[bookDate].filter(
    (slot) => slot !== bookTime
  );

  // Update the slots directly in the database
  await Doctor.findByIdAndUpdate(
    doctor._id,
    {
      $set: { [`slots_booked.${bookDate}`]: updatedSlots },
    },
    { new: true }
  );

  appoiment.isCancelled = cancel;
  appoiment.status = status;

  await appoiment.save();
  return res.status(200).json({
    success: true,
    message: "cancelled",
  });
};

exports.docComletedAppoiment = async (req, res) => {
  const { AppoimentId } = req.params;
  const { complete } = req.body;
  if (!AppoimentId) {
    return res.status(401).json({
      success: false,
      message: "Appoiment not found",
    });
  }

  const appoiment = await APPOIMENT.findById(AppoimentId);
  if (!appoiment || appoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiment yet",
    });
  }

  appoiment.status = complete;

  await appoiment.save();
  return res.status(200).json({
    success: true,
    message: "Completed",
  });
};

exports.doctorDashboard = async (req, res) => {
  const { docId } = req.params;

  const appoiment = await APPOIMENT.find({ doctorId: docId });

  let earning = 0;
  appoiment.map((ele) => {
    if (ele.status === "completed") {
      earning += ele.fees;
    }
  });

  let cancelledAppoiment = 0;
  appoiment.map((ele) => {
    if (ele.status === "cancelled") {
      cancelledAppoiment += 1;
    }
  });

  let completed = 0;
  appoiment.map((ele) => {
    if (ele.status === "completed") {
      completed += 1;
    }
  });

  let pending = 0;
  appoiment.map((ele) => {
    if (ele.status === "pending") {
      pending += 1;
    }
  });

  let patient = [];
  appoiment.map((ele) => {
    if (!patient.includes(ele.userId)) {
      patient.push(ele.userId);
    }
  });

  const appoimentLength = appoiment.length;

  const dashData = {
    earning,
    appoimentLength,
    patient: patient.length,
    latestAppoiment: appoiment.reverse().slice(0, 4),
    cancelledAppoiment,
    completed,
    pending,
  };

  res.status(200).json({
    success: true,
    dashData,
  });
};

exports.viewAllPatientsDoctors = async (req, res) => {
  try {
    const { docId } = req.params;

    const appointments = await APPOIMENT.find({ doctorId: docId });

    const patientIds = [...new Set(appointments.map((ele) => ele.userId))];

    const users = await User.find({ _id: { $in: patientIds } });

    const allAppointments = await APPOIMENT.find({
      userId: { $in: patientIds },
      doctorId: docId,
    });

    const data = users
      .map((user) => {
        const userAppointments = allAppointments.filter(
          (app) => app.userId.toString() === user._id.toString()
        );

        return {
          user,
          appoimetLength: userAppointments.length,
          cancelledCount: userAppointments.filter(
            (app) => app.status === "cancelled"
          ).length,
          completedCount: userAppointments.filter(
            (app) => app.status === "completed"
          ).length,
          penCount: userAppointments.filter((app) => app.status === "pending")
            .length,
        };
      })
      .reverse();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.approvedAppoiment = async (req, res) => {
  const { AppoimentId } = req.params;
  const { approve } = req.body;
  if (!AppoimentId) {
    return res.status(401).json({
      success: false,
      message: "Appoiment not found",
    });
  }

  const appoiment = await APPOIMENT.findById(AppoimentId);
  if (!appoiment || appoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiment yet",
    });
  }

  appoiment.status = approve;
  await appoiment.save();

  if (approve === "approve") {
    scheduleAppointmentReminder(appoiment);
    sendApprovalEmail(appoiment.userData.email, appoiment);
  }

  await appoiment.save();
  return res.status(200).json({
    success: true,
    message: "Approved",
  });
};
