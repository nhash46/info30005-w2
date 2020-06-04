const mongoose = require("mongoose");
const flash = require('connect-flash');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// import user model
const User = require('../models/user');
const Forum = require('../models/forum');

// function that loads form page for adding post
const newUserForm = (req, res) => {
    res.status(200).send(),
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
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  });

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('signup-resubmit',
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

// Load Edit Form
const editProfile = async (req, res) => {
  res.status(200).send(),
  res.render('edit-profile', {
    title: 'Edit Profile',
  });
}

// function to handle request to edit profile
const updateProfile = (req, res) => {
  // extract info. from body

  let user = {};

  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;

  let query = {_id:req.params._id}


  User.updateOne(query, user, function (err) {
    if (err){
      console.log(err);
    }
    else{
      req.flash('success','Profile Updated');
      res.redirect('/user/profile');
    }
  });
}

// function that renders the user profile
const getUserProfile = async (req, res) => {
    res.render('profile', {
    });
};

// function that retrieves posts made by a specified user
const getUserPosts = async (req, res) => {
  Forum.find({author:req.params.id}, function(err, forums){
    if(err){
      console.log(err);
    } else {
      res.render("forum-posts", {
        title: req.params.id + "'s Forums",
        forums: forums
      });
    }
  });
};

// function that loads form page for logging in
const loginPage = (req, res) => {
    res.status(200).send(),
    res.render('signin', {
        title:'Sign In'
    });
};

// function to handle a request to login
const logIn = (req, res, next) => {

  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/user/login',
    failureFlash: true
  })(req, res, next);

};

// log out the current user
const logOutUser = (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out. Come back soon!');
  res.redirect('/user/login');
}

module.exports = {
  addUser,
  getUserProfile,
  getUserPosts,
  logIn,
  newUserForm,
  loginPage,
  logOutUser,
  updateProfile,
  editProfile,
};
