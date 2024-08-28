const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  date: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});



module.exports = mongoose.model("Event", eventSchema);
