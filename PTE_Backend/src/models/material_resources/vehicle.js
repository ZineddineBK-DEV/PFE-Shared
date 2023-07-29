const mongoose = require("mongoose");
const VehicleSchema = mongoose.Schema({
  model: { type: String, required: true },
  registration_number: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

});
module.exports = mongoose.model("Vehicle", VehicleSchema);
