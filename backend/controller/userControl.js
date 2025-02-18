const User = require("../modules/userSchema");
const bcrypt = require("bcrypt");
const { genToken } = require("../utils/genToken");
const Doctor = require("../modules/doctorShema");
const APPOIMENT = require("../modules/appoimentSchema");
const Review = require("../modules/review");
const sendVerificationEmail = require("../configDB/mailer");

const OTP_EXPIRY_TIME = 10 * 60 * 1000;

exports.userEmail = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpires = Date.now() + OTP_EXPIRY_TIME; // Set expiry

    if (user) {
      if (user.verified) {
        return res.status(400).json({
          success: false,
          message: "Email already registered and verified.",
        });
      }

      // 🟢 Resend OTP for unverified users
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();

      sendVerificationEmail(user.email, otp);

      return res.json({
        success: true,
        message: "New OTP sent. Please check your inbox.",
      });
    }

    // 🆕 Register new user with OTP
    user = await User.create({
      email,
      otp,
      otpExpires,
      verified: false,
    });
    await user.save();

    sendVerificationEmail(email, otp);

    res.json({ success: true, message: "OTP sent. Please check your inbox." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "enter email and otp" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // ❌ Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // ✅ Check if OTP matches
    if (user.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP. Please try again." });
    }

    // ✅ Mark user as verified
    user.verified = true;
    user.otp = undefined; // Remove OTP after successful verification
    user.otpExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully!",
      user: user.email,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.userRegister = async (req, res) => {
  const { fullName, email, password, age, gender, dob, phone } = req.body;

  if ((!fullName, !email, !password)) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }
  const isEmail = await User.findOne({ email });
  if (!isEmail) {
    return res.status(400).json({
      sucess: false,
      message: "email not found",
    });
  }

  if (!isEmail.verified) {
    return res.status(400).json({
      sucess: false,
      message: "Email is not verified ",
    });
  }

  const hassPass = await bcrypt.hash(password, 10);

  try {
    const user = await User.findByIdAndUpdate(
      isEmail._id,
      {
        fullName,
        email,
        password: hassPass,
        age,
        gender,
        dob,
        phone,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Registered successsfully",
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  try {
    const genPass = await User.findOne({ email });
    if (!genPass) {
      return res.status(400).json({
        sucess: false,
        message: "User Not Found",
      });
    }

    const banCheck = genPass.active;

    if (banCheck === "inActive") {
      return res.status(400).json({
        sucess: false,
        message: "User Is Banned",
      });
    }

    const isMatch = await bcrypt.compare(password, genPass.password);

    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "incorrect email/password",
      });
    }

    const userdata = {
      id: genPass.id,
      fullName: genPass.fullName,
      email: genPass.email,
      role: genPass.role,
      gender: genPass.gender,
      dob: genPass.dob,
      phone: genPass.phone,
      active: genPass.active,
      image: genPass.image,
    };

    req.genPass = userdata;

    genToken(req, res);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userProfile = async (req, res) => {
  const uId = req.id;
  // const { userId } = req.params;

  // if (uId !== userId) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "user not have permission",
  //   });
  // }

  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  const user = await User.findById(uId);
  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }
  const { _id, fullName, email, age, gender, dob, phone } = user;
  res.status(201).json({
    success: true,
    user: {
      _id,
      fullName,
      email,
      age,
      gender,
      dob,
      phone,
    },
  });
};

exports.userUpdate = async (req, res) => {
  const uId = req.id;

  const { userId } = req.params;

  if (uId !== userId) {
    return res.status(401).json({
      success: false,
      message: "user not have permission",
    });
  }

  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  const { fullName, email, age, gender, dob, phone } = req.body;
  if ((!fullName, !email, !age, !gender, !dob, !phone)) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  // const hassPass = await bcrypt.hash(password, 10);

  user.fullName = fullName;
  user.email = email;
  // user.password = hassPass;
  user.age = age;
  user.gender = gender;
  user.dob = dob;
  user.phone = phone;

  const updateUser = await user.save();

  res.status(201).json({
    success: true,
    message: "updated successfully",
    user: {
      id: updateUser._id,
      fullName: updateUser.fullName,
      email: updateUser.email,
      // password: updateUser.password,
      age: updateUser.age,
      gender: updateUser.gender,
      dob: updateUser.dob,
      phone: updateUser.phone,
    },
  });
};

exports.userDelete = async (req, res) => {
  const uId = req.id;
  const { userId } = req.params;

  if (uId !== userId) {
    return res.status(401).json({
      success: false,
      message: "user not have permission",
    });
  }

  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  res.status(201).json({
    success: true,
    message: "deleted successfully",
  });
};

exports.bookAppoiment = async (req, res) => {
  const { docId } = req.params;
  const uId = req.id;
  const { time, date } = req.body;

  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "pls login to book appoiment",
    });
  }

  if (!time || !date) {
    return res.status(400).json({
      sucess: false,
      message: "enter full details",
    });
  }

  const userData = await User.findById(uId).select("-password");
  if (!userData) {
    return res.status(400).json({
      sucess: false,
      message: "pls login to book appoiment",
    });
  }

  const banCheck = userData.active;

  if (banCheck === "inActive") {
    return res.status(400).json({
      sucess: false,
      message: "user not allowed login",
    });
  }

  const doctor = await Doctor.findById(docId).select("-password");
  if (!doctor) {
    return res.status(404).json({
      succes: false,
      message: "doctor not found",
    });
  }

  let slots_booked = doctor.slots_booked;

  if (slots_booked[date]) {
    if (slots_booked[date].includes(time)) {
      return res.json({ success: false, message: "slot not avilable" });
    } else {
      slots_booked[date].push(time);
    }
  } else {
    slots_booked[date] = [];
    slots_booked[date].push(time);
  }

  const fee = doctor.fees;

  delete doctor.slots_booked;

  const appoimentData = {
    userId: uId,
    doctorId: docId,
    userData,
    docData: doctor,
    fees: doctor.fees,
    slotBookedDate: date,
    slotBookedTime: time,
  };

  const newAppoiment = new APPOIMENT(appoimentData);
  await newAppoiment.save();

  await Doctor.findByIdAndUpdate(docId, { slots_booked });

  return res.status(200).json({
    success: true,
    message: "Booked appoiment successfully",
    fee,
  });
};

exports.userAppoimentCancel = async (req, res) => {
  const uId = req.id;
  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }
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

  appoiment.status = status;
  appoiment.isCancelled = cancel;

  await appoiment.save();
  return res.status(200).json({
    success: true,
    message: "cancelled",
  });
};

exports.userAllAppoiment = async (req, res) => {
  const uId = req.id;
  if (!uId) {
    return res.status(400).json({
      sucess: false,
      message: "user inValid",
    });
  }

  const appoiment = (await APPOIMENT.find({ userId: uId })).reverse();
  if (!appoiment) {
    return res.status(400).json({
      sucess: false,
      message: "appoiment inValid",
    });
  }

  res.status(201).json({
    success: true,
    message: "successfully",
    appoiment,
  });
};

exports.userLogOut = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully",
      authentication: false,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

exports.reviewByUser = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const review = await Review.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Review sended",
      review,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
