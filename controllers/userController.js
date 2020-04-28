const mongoose = require("mongoose");

// import user model
const User = mongoose.model("User");
const Consultation = mongoose.model("Consultation");

    
// function to add user
const addUser = async (req, res) => {

    var newUser = new User({
      userType: req.body.userType,
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    })
  
    // add user to database
    newUser.save(function (err, user) {
      if (err) {
        res.send("ERROR: user type must be student or counsellor");
        return console.error(err);
      } else {
        res.send("Successful signup!");
      }
    });
};

// function to handle a request to get all users
const getAllUsers = async (req, res) => {
    
    try {
      const all_users = await User.find().select('username');
      return res.send(all_users);
    } catch (err) {
      res.status(400);
      return res.send("Database query failed");
    }
  };

// function to handle a request to login
const logIn = async (req, res) => {

  User.find({"username": req.body.username, "password": req.body.password}, function(err, user){
    if(err){
      return console.error(err.stack);
    }
    if(!user){
      return res.send("User not found!");
    }
    else {
      return res.send("Welcome back " + user.username);
    }
  });
};

  // function to create a new consultation
const newConsultation = async (req, res) => {

  var newConsultation = new Consultation ({

    student: req.body.student,
    counsellor: req.body.counsellor,
    date: req.body.date,
    time: req.body.time,
    isOnline: req.body.isOnline,

  })

  // add user to database
  newConsultation.save(function (err, consultation) {
    if (err) {
      return console.error(err);
    } 
    else {
      res.send("Consulation confirmed for " + newConsultation.date + " at " + newConsultation.time);
    }
  });

};

module.exports = {
  addUser,
  getAllUsers,
  logIn,
  newConsultation
};
