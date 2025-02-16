const mongoose = require("mongoose");

const appoimentSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  doctorId: {
    type: String,
    require: true,
  },
  docData: {
    type: Object,
    require: true,
  },
  userData: {
    type: Object,
    require: true,
  },
  slotBookedDate: {
    type: String,
    require: true,
  },
  slotBookedTime: {
    type: String,
    require: true,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  fees: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  dateOfBooked: {
    type: Date,
    default: Date.now(),
  },
});

const APPOIMENT = mongoose.model("Appoiment", appoimentSchema);
module.exports = APPOIMENT;
