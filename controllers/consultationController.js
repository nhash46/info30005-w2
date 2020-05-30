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
const getAllConsultations = (req, res, next) => {

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
        res.render("consultations-manage", {
          title: 'My Consultations',
          consultations: consultations
        });
      }
    });
  };

// function that loads the consultation home
const loadConsultationHome = (req, res) => {
  res.render('consultations', {
    title:'Book a consultation!',
  });
}

// function that creates a new consultation
const newConsultation = (req, res, next) => {

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

// function that loads form page for new consultation
const loadConsultationForm = (req, res) => {
  res.render('consultation-form', {
    title:'Request a consultation',
  });
}

module.exports = {
    getAllConsultations,
    getUserConsultations,
    newConsultation,
    loadConsultationForm,
    loadConsultationHome
};