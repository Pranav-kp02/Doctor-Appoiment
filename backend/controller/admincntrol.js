const APPOIMENT = require("../modules/appoimentSchema");
const Doctor = require("../modules/doctorShema");
const Review = require("../modules/review");
const User = require("../modules/userSchema");

exports.viewAllAppoiment = async (req, res) => {
  const appoiment = (await APPOIMENT.find()).reverse();
  if (!appoiment || appoiment.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiment yet",
    });
  }
  return res.status(200).json({
    success: true,
    appoiment,
  });
};

exports.pendingAppoiment = async (req, res) => {
  const pending = await APPOIMENT.find({ status: { $ne: "completed" } });
  if (!pending || pending.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No pending appoiment Found",
    });
  }
  return res.status(200).json({
    success: true,
    pending,
  });
};

exports.alldoctorsApply = async (req, res) => {
  const doctors = (await Doctor.find({ role: "doctor apply" })).reverse();
  if (!doctors || doctors.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No doctors applyed ",
    });
  }
  return res.status(200).json({
    success: true,
    doctors,
  });
};

exports.docApplyUpdate = async (req, res) => {
  try {
    const { appId } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        sucess: false,
        message: "enter status details",
      });
    }

    const doctor = await Doctor.findById(appId);

    if (!doctor) {
      return res.status(404).json({
        success: true,
        message: "doctor not Found",
      });
    }

    doctor.role = role;
    doctor.save();
    res.status(200).json({
      success: true,
      message: "role updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.docAvailableToggle = async (req, res) => {
  try {
    const { docId } = req.params;
    const { available } = req.body; // Fixed spelling from 'avilable' to 'available'

    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(404).json({
        success: false, // Fixed: Changed true to false for error case
        message: "Doctor not found",
      });
    }

    doctor.available = available;
    await doctor.save(); // Added await here

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      doctor: doctor, // Added doctor data in response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.veiwAllDoctorsAdmin = async (req, res) => {
  const doctors = await Doctor.find({ role: "Doctor" }).select("-password");

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

exports.bannUser = async (req, res) => {
  const { uId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      sucess: false,
      message: "enter active/inActive details",
    });
  }
  const user = await User.findById(uId);
  if (!user) {
    return res.status(404).json({
      success: true,
      message: "doctor not Found",
    });
  }
  user.active = status;
  user.save();
  res.status(200).json({
    success: true,
    message: "user has been banned",
    active: user.active,
  });
};

exports.unbanUser = async (req, res) => {
  const { uId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      sucess: false,
      message: "enter active/inActive details",
    });
  }
  const user = await User.findById(uId);
  if (!user) {
    return res.status(404).json({
      success: true,
      message: "user not Found",
    });
  }
  user.active = status;
  user.save();
  res.status(200).json({
    success: true,
    message: "user has been unbaned",
    active: user.active,
  });
};

exports.adminDashbord = async (req, res) => {
  const doctors = await Doctor.find({ role: "Doctor" });
  const user = await User.find({});
  const appoiment = await APPOIMENT.find({});

  const dashData = {
    doctors: doctors.length,
    user: user.length,
    appoiment: appoiment.length,
    latestAppoiment: appoiment.reverse().slice(0, 5),
  };

  res.status(200).json({
    success: true,
    dashData,
  });
};

exports.adminCancelAppoiment = async (req, res) => {
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

exports.deleteApplyDoctor = async (req, res) => {
  const { docId } = req.params;

  const doctorApply = await Doctor.findByIdAndDelete(docId);
  if (!doctorApply) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }
  res.status(200).json({
    success: true,
    message: "Deleted successfully ",
  });
};

exports.viewAllUsers = async (req, res) => {
  const user = await (await User.find()).reverse();
  if (!user || user.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No appoiment yet",
    });
  }

  let userData = await Promise.all(
    user.map(async (ele) => {
      const appoiment = await APPOIMENT.find({ userId: ele._id });

      let appoimetLength = appoiment.length;

      let cancelledCount = appoiment.reduce(
        (count, app) => (app.status === "cancelled" ? count + 1 : count),
        0
      );
      let completedCount = appoiment.reduce(
        (count, app) => (app.status === "completed" ? count + 1 : count),
        0
      );
      let penCount = appoiment.reduce(
        (count, app) => (app.status === "pending" ? count + 1 : count),
        0
      );

      return {
        user: ele,
        appoimetLength,
        cancelledCount,
        completedCount,
        penCount,
      };
    })
  );

  return res.status(200).json({
    success: true,
    userData,
  });
};

exports.userDetailsAdmin = async (req, res) => {
  const { uId } = req.params;

  const user = await User.findById(uId);
  if (!user) {
    return res.status(404).json({
      success: true,
      message: "doctor not Found",
    });
  }

  const appoiment = await APPOIMENT.find({ userId: uId });

  const dataUser = {
    appoiment: appoiment,
    user: user,
  };

  res.status(200).json({
    success: true,
    dataUser,
  });
};

exports.adminDocDelete = async (req, res) => {
  const { docId } = req.params;

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

exports.viewAllReview = async (req, res) => {
  const review = (await Review.find()).reverse();
  if (!review || review.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No review yet",
    });
  }
  return res.status(200).json({
    success: true,
    review,
  });
};

exports.adminReviewDelete = async (req, res) => {
  const { rId } = req.params;

  const review = await Review.findByIdAndDelete(rId);
  if (!review) {
    return res.status(400).json({
      sucess: false,
      message: "review inValid",
    });
  }

  res.status(201).json({
    success: true,
    message: "deleted successfully",
  });
};
