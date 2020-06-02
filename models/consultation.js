const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true
  },
  counsellor: {
    type: String, 
    required: true
  },
  date: Date,
  time: String,
  venue: String,
  status: {
    type: String,
    enum: ['confirmed','pending','completed'],
    default: 'pending'
  }
});

const Consultation = mongoose.model("Consultation", consultationSchema, "consultations");

module.exports = Consultation;