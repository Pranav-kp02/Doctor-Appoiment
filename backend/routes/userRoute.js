const express = require("express");
const {
  userRegister,
  userLogin,
  userProfile,
  userUpdate,
  userDelete,
  userAppoimentCancel,
  userAllAppoiment,
  userLogOut,
  reviewByUser,
  userEmail,
  verifyOtp,
} = require("../controller/userControl");
const { authentication } = require("../middleWare/auth");
const { veiwAllDoctors } = require("../controller/doctorCntrol");
const userRouter = express.Router();

// email verfication
userRouter.route("/emailcheck").post(userEmail);
userRouter.route("/otp").post(verifyOtp);

// login/register
userRouter.route("/reg").post(userRegister);
userRouter.route("/log").post(userLogin);

// user profile
userRouter.route("/userProfile").get(authentication, userProfile);
userRouter
  .route("/prof/:userId")

  .put(authentication, userUpdate)
  .delete(authentication, userDelete);

// log out
userRouter.route("/logOut").post(authentication, userLogOut);

// all doctors list not authenticated
userRouter.route("/userAllDoctors").get(veiwAllDoctors);

// user appoiments/cancel
userRouter.route("/userAllAppoiment").get(authentication, userAllAppoiment);
userRouter
  .route("/cancelAppoiment/:AppoimentId")
  .put(authentication, userAppoimentCancel);

// reviews
userRouter.route("/review").post(reviewByUser);

module.exports = userRouter;
