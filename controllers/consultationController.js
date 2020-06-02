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

// function to get consultation view
const getAllConsultations = (req, res, next) => {

    Consultation.find({}, function(err, consultations){
        if(err){
          console.log(err);
        } else {
          res.render("consultations", {
            title: 'My Consultations',
            consultations: consultations,
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
    title:'Book a consultation!'
  });
}

// function that creates a new consultation
const newConsultation = (req, res, next) => {

    let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('consultation-form',
    { 
      title: 'Book a consultation',
      errors: errors.mapped()
    });
  } else {
      // extract info. from body
    var newConsultation = new Consultation({
      student: req.user.username,
      counsellor: 'UniMelbCounsellor',
      date: req.body.date,
      time: req.body.time,
      venue: req.body.venue
    });

    // add consultation into db
    newConsultation.save(function (err) {
      if (err){
        console.log(err);
        res.status(400);
      }
      else{
        req.flash('success','You have successfully booked a consultation');
        res.redirect('/consultations/manage');
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

// Load Edit Form
const loadEditConsultation = async (req, res) => {

  Consultation.findById(req.params._id, function(err, consultation){
    if(consultation.student != req.user.username){
      req.flash('danger', 'Not authorised to manage this consultation');
      res.redirect('/consultations');
    }
    else {
      res.render('edit-consultation', {
        title: 'Manage my consultation',
        consultation: consultation
      });
    }
  });
}

// function to handle request to delete consultation
const deleteConsultation = (req, res) => {
  // check if user is logged in
  if(!req.user._id){
    res.status(500).send();
  }
  let query = {_id:req.params._id}

  // check if user is the author of post
  Consultation.findById(query, function(err, consultation){
    if(consultation.student != req.user.username){
      res.status(500).send();
    } 
    else {
      Consultation.remove(query, function(err){
        if(err){
          console.log(err);
        }
        req.flash('success','Consultation cancelled');
        res.send('Success');
      });
    }
  });
}

// function to handle request to edit consultation
const updateConsultation = (req, res) => {
  // extract info. from body

  let consultation = {};

  consultation.date = req.body.date;
  consultation.time = req.body.time;
  consultation.venue = req.body.venue;
   
  let query = {_id:req.params._id}
 
   // add consultation into db
  Consultation.updateOne(query, consultation, function (err) {
    if (err){
      console.log(err);
    }
    else{
      req.flash('success','Your consultation has been successfully updated');
      res.redirect('/consultations/manage');
    } 
  });
}

// access control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login')
  }
}

module.exports = {
    getAllConsultations,
    getUserConsultations,
    newConsultation,
    loadConsultationForm,
    loadConsultationHome,
    loadEditConsultation,
    deleteConsultation,
    updateConsultation,
    ensureAuthenticated
};