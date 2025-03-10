const express = require("express");
const {
  docRegister,
  docLogin,
  docProfile,
  docUpdate,
  docDelete,
  updatePendingAppoiment,
  approvedAppoiment,
  docPendingAppoiment,
  doctorAllAppoiment,
  docCancelAppoiment,
  docComletedAppoiment,
  doctorDashboard,
  viewAllPatientsDoctors,
} = require("../controller/doctorCntrol");
const { authentication } = require("../middleWare/auth");
const { bookAppoiment } = require("../controller/userControl");
const { upload } = require("../configDB/cloudinary");
const { appoimentlimiter } = require("../middleWare/rateLimit");
const docRouter = express.Router();

// register/login
docRouter
  .route("/docReg")
  .post(authentication, upload.single("image"), docRegister);
docRouter.route("/docLog").post(docLogin);

// doc profile and user booking appoiment
docRouter.route("/docProfDetail").get(authentication, docProfile);
docRouter
  .route("/docProf/:docId")
  .put(authentication, docUpdate)
  .delete(authentication, docDelete)
  .post(authentication, appoimentlimiter, bookAppoiment); //user booking appoiment

// doc side contollers
docRouter.route("/docAppoiment").get(authentication, docPendingAppoiment);
docRouter
  .route("/docPendingAppoiment/:appId")
  .post(authentication, updatePendingAppoiment);
docRouter.route("/docAllAppoiment").get(authentication, doctorAllAppoiment);

docRouter
  .route("/appoimentCancel/:AppoimentId")
  .put(authentication, docCancelAppoiment);

docRouter.route("/doctorDashboard/:docId").get(authentication, doctorDashboard);

docRouter
  .route("/viewAllPations/:docId")
  .get(authentication, viewAllPatientsDoctors);

docRouter
  .route("/appoimentCompleted/:AppoimentId")
  .put(authentication, docComletedAppoiment);

docRouter
  .route("/appoimentApprove/:AppoimentId")
  .put(authentication, approvedAppoiment);
module.exports = docRouter;
