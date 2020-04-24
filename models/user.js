const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;