const mongoose = require("mongoose");
const flash = require('connect-flash');
const {validationResult} = require('express-validator/check');

// import forum model
const Forum = mongoose.model("Post");

// import commment model
const Comment = mongoose.model("Comment");

// import user model
const User = mongoose.model("User");

// import consulation model
const Consultation = mongoose.model("Consultation");

// function to retrieve all appointments
const getAllConsultations = async (req, res) => {

    Consultation.find({}, function(err, consultations){
        if(err){
          console.log(err);
        } else {
          res.render("consultations", {
            title: 'My Consultations',
            consultations: consultations
          });
        }
      });
};

// function that retrieves user appointments
const getUserConsultations = async (req, res) => {

    Consultation.find({$or: [ { student: req.user.username }, { counsellor: req.user.username } ]}, function(err, consultations){
      if(err){
        console.log(err);
      } else {
        res.render("consultations", {
          title: 'My Consultations',
          consultations: consultations
        });
      }
    });
  };

// function that creates a new consultation
const newConsultation = (req, res) => {

    let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('consultations-form',
    { 
      title: 'Book a consultation',
      errors: errors.mapped()
    });
  } else {
      // extract info. from body
    var newConsultation = new Consultation({
      student: req.user._id,
      counsellor: req.body.counsellor,
      date: req.body.date,
      time: req.body.time,
      isOnline: req.body.isOnline
    });

    // add post into db
    newConsultation.save(function (err) {
      if (err){
        console.log(err);
        res.status(400);
      }
      else{
        req.flash('success','Consultation Booked');
        res.redirect('/consultations');
      } 
    });
  } 
};

// function to handle request to cancel consultation
const cancelConsultation = (req, res) => {
    // check if user is logged in
    if(!req.user._id){
      res.status(500).send();
    }
    let query = {_id:req.user._id}
  
    // check if user is the author of post
    Consultation.findById(query, function(err, forum){
      if(consultation.student != req.user.username || consultation.counsellor != req.user.username){
        res.status(500).send();
      } 
      else {
        Consultation.remove(query, function(err){
          if(err){
            console.log(err);
          }
          req.flash('success','Consultation Cancelled');
          res.send('Success');
        });
      }
    });
  }

module.exports = {
    getAllConsultations,
    getUserConsultations,
    newConsultation,
    cancelConsultation
};