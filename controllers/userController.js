const mongoose = require("mongoose");

// import user model
const User = mongoose.model("users");

    
// function to add user
const addUser = async (req, res) => {

    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    })
  
    // add user to database
    newUser.save(function (err, user) {
      if (err) return console.error(err);
    });
  
    res.send("Successful signup!");
};

// function to handle a request to get all users
const getAllUsers = async (req, res) => {
    
    try {
      const all_users = await User.find();
      return res.send(all_users.username);
    } catch (err) {
      res.status(400);
      return res.send("Database query failed");
    }
  };

module.exports = {
  addUser,
  getAllUsers
};
