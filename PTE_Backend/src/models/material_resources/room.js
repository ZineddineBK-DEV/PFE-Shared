const mongoose = require("mongoose");
const RoomSchema = mongoose.Schema({
  label: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Room", RoomSchema);
