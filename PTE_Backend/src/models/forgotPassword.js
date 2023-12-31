const mongoose = require("mongoose");

const ForgetPassword = mongoose.Schema({
  email: { type: String },
  code: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
});

module.exports = mongoose.model("forgetPassword", ForgetPassword);
