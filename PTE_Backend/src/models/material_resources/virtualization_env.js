const mongoose = require("mongoose");
const VirtualizationEnvSchema = mongoose.Schema({
  label: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("VirtualizationEnv", VirtualizationEnvSchema);
