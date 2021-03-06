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
    Consultation.find({student: req.user.username }, function(err, consultations){
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

// function that retrieves user appointments
const getPendingConsultations = async (req, res) => {
  Consultation.find({status: 'pending'}, function(err, consultations){
    if(req.user.userType != 'counsellor'){
      req.flash('danger', 'Not authorised to view this page');
      res.redirect('/consultations');
    }
    else {
      if(err){
        console.log(err);
      } else {
        res.render("consultations-requests", {
          title: 'Requested Consultations',
          consultations: consultations
        });
      }
    }
  });
};

// function that retrieves schedhuled consultations
const getSchedhuledConsultations = async (req, res) => {
  Consultation.find({status: 'schedhuled', counsellor: req.user.username}, function(err, consultations){
    if(req.user.userType != 'counsellor'){
      req.flash('danger', 'Not authorised to view this page');
      res.redirect('/consultations');
    }
    else {
      if(err){
        console.log(err);
      } else {
        res.render("consultations-confirmed", {
          consultations: consultations
        });
      }
    }
  });
};

// function that retrieves completed consultations
const getCompletedConsultations = async (req, res) => {
  Consultation.find({status: 'completed', counsellor: req.user.username}, function(err, consultations){
    if(req.user.userType != 'counsellor'){
      req.flash('danger', 'Not authorised to view this page');
      res.redirect('/consultations');
    }
    else {
      if(err){
        console.log(err);
      } else {
        res.render("consultations-confirmed-completed", {
          consultations: consultations
        });
      }
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

// function that changes status of consultation from pending to schedhuled
const acceptRequest = async (req, res) => {

    if(req.user.userType != 'counsellor'){
      req.flash('danger', 'Not authorised to manage this consultation');
      res.redirect('/consultations');
    }
    else {
      let consultation = {};

      consultation.status = 'schedhuled';
      consultation.counsellor = req.user.username;
      
      let query = {_id:req.params._id}
    
      // add consultation into db
      Consultation.updateOne(query, consultation, function (err) {
        if (err){
          console.log(err);
        }
        else{
          req.flash('success','You have successfully accepted this consultation request');
          res.redirect('/consultations/manage');
        } 
      });
    }
}

// function that changes status of consultation from pending to schedhuled
const markAsComplete = async (req, res) => {

  if(req.user.userType != 'counsellor'){
    req.flash('danger', 'Not authorised to manage this consultation');
    res.redirect('/consultations');
  }
  else {
    let consultation = {};

    consultation.status = 'completed';
    consultation.counsellor = req.user.username;
    
    let query = {_id:req.params._id}
  
    // add consultation into db
    Consultation.updateOne(query, consultation, function (err) {
      if (err){
        console.log(err);
      }
      else{
        req.flash('success','You have successfully accepted this consultation request');
        res.redirect('/consultations/manage');
      } 
    });
  }
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
    ensureAuthenticated,
    getPendingConsultations,
    acceptRequest,
    getSchedhuledConsultations,
    markAsComplete,
    getCompletedConsultations
};