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

userRouter.route("/emailcheck").post(userEmail);
userRouter.route("/otp").post(verifyOtp);

userRouter.route("/reg").post(userRegister);
userRouter.route("/log").post(userLogin);

userRouter.route("/userProfile").get(authentication, userProfile);

userRouter
  .route("/prof/:userId")

  .put(authentication, userUpdate)
  .delete(authentication, userDelete);

userRouter.route("/logOut").post(authentication, userLogOut);

userRouter.route("/userAllDoctors").get(veiwAllDoctors);
userRouter.route("/userAllAppoiment").get(authentication, userAllAppoiment);
userRouter
  .route("/cancelAppoiment/:AppoimentId")
  .put(authentication, userAppoimentCancel);

userRouter.route("/review").post(reviewByUser);

module.exports = userRouter;
