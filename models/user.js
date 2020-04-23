const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  first_name: String,
  last_name: String,
  email: String
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;