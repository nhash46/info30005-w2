const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ['student','counsellor'],
    default: 'student'
  },
  username: {type: String, unique: true},
  password: String,
  password2: String,
  first_name: String,
  last_name: String,
  email: {type: String, unique: true}
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;