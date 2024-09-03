const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required:   true },
  picture: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
