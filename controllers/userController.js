const mongoose = require("mongoose");
const flash = require('connect-flash');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// import user model
const User = mongoose.model("User");
const Consultation = mongoose.model("Consultation");

// function that loads form page for adding post
const newUserForm = (req, res) => {
    res.render('signup', {
        title:'Sign Up'
    });
};
    
// function to add user
const addUser = (req, res) => {

  var newUser = new User({
    userType: req.body.userType,
    username: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  });

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('signup',
      { 
        newUser:newUser,
        errors: errors.mapped()
      });
  } else {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;

        // add user to database
        newUser.save(function (err) {
          if (err) {
            console.log(err);
            return;
          } else {
            req.flash('success', 'Successful registration! You can now log in');
            res.redirect('login');
          }
        });
      });
    });
  }
};

// function to handle a request to get all users
const getAllUsers = async (req, res) => {
    
    try {
      const all_users = await User.find();
      return res.send(all_users);
    } catch (err) {
      res.status(400);
      return res.send("Database query failed");
    }
  };

// function that loads form page for adding post
const loginPage = (req, res) => {
    res.render('signin', {
        title:'Sign In'
    });
};

// function to handle a request to login
const logIn = async (req, res, next) => {

  passport.authenticate('local', {
    successRedirect:'/forum-posts',
    failureRedirect:'/user/login',
    failureFlash: true
  })(req, res, next);

  /*
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send("username or password is incorrect");
    }
    if(user){
      return res.status(200).send("Welcome back " + username);
    }
  })
  */
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

  // add consultation to database
  newConsultation.save(function (err, consultation) {
    if (err) {
      return console.error(err);
    } 
    else {
      res.send("Consulation confirmed for " + newConsultation.date + " at " + newConsultation.time);
    }
  });

};

 // 
 const getAllConsultations = async (req, res) => {  
  try{
  const all_consultations = await Consultation.find();
  return res.send(all_consultations);
  }
  catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// request user object
const getUserRequest = async (req, res) => {
  res.locals.user = req.user || null;
  next();
}

module.exports = {
  addUser,
  getAllUsers,
  logIn,
  newConsultation,
  getAllConsultations,
  newUserForm,
  loginPage,
  getUserRequest
};
