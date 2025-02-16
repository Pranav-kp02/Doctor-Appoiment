const express = require("express");
const { authentication, authorization } = require("../middleWare/auth");
const {
  viewAllAppoiment,
  pendingAppoiment,
  alldoctorsApply,
  docApplyUpdate,
  bannUser,
  adminDashbord,
  veiwAllDoctorsAdmin,
  docAvailableToggle,
  adminCancelAppoiment,
  deleteApplyDoctor,
  viewAllUsers,
  userDetailsAdmin,
  unbanUser,
  adminDocDelete,
  viewAllReview,
  adminReviewDelete,
} = require("../controller/admincntrol");
const adminRoute = express.Router();

adminRoute
  .route("/adminDashBoard")
  .get(authentication, authorization("admin"), adminDashbord);

adminRoute
  .route("/alldoctors")
  .get(authentication, authorization("admin"), veiwAllDoctorsAdmin);

adminRoute
  .route("/toggleAvailability/:docId")
  .put(authentication, authorization("admin"), docAvailableToggle);

adminRoute
  .route("/allAppoiment")
  .get(authentication, authorization("admin"), viewAllAppoiment);

adminRoute
  .route("/pendingAppoiment")
  .get(authentication, authorization("admin"), pendingAppoiment);

adminRoute
  .route("/allDoctorsApply")
  .get(authentication, authorization("admin"), alldoctorsApply);

adminRoute
  .route("/docApplyUpdate/:appId")
  .post(authentication, authorization("admin"), docApplyUpdate);

adminRoute
  .route("/banUser/:uId")
  .post(authentication, authorization("admin"), bannUser);

adminRoute
  .route("/unbanUser/:uId")
  .post(authentication, authorization("admin"), unbanUser);

adminRoute
  .route("/AdminAppoimentCancel/:AppoimentId")
  .put(authentication, authorization("admin"), adminCancelAppoiment);

adminRoute
  .route("/applyDocDel/:docId")
  .delete(authentication, authorization("admin"), deleteApplyDoctor);

adminRoute
  .route("/allUsers")
  .get(authentication, authorization("admin"), viewAllUsers);

adminRoute
  .route("/userDetailsAdmin/:uId")
  .get(authentication, authorization("admin"), userDetailsAdmin);

adminRoute
  .route("/docDeleteAdmin/:docId")
  .delete(authentication, authorization("admin"), adminDocDelete);

adminRoute
  .route("/adminReview")
  .get(authentication, authorization("admin"), viewAllReview);

adminRoute
  .route("/docDeleteReview/:rId")
  .delete(authentication, authorization("admin"), adminReviewDelete);

module.exports = adminRoute;
