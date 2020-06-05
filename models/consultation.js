const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  student: {
    type: String,
    required: true
  },
  counsellor: {
    type: String
  },
  date: Date,
  time: String,
  venue: String,
  status: {
    type: String,
    enum: ['schedhuled','pending','completed'],
    default: 'pending'
  }
});

const Consultation = mongoose.model("Consultation", consultationSchema, "consulations");

module.exports = Consultation;