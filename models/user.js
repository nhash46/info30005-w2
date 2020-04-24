const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;