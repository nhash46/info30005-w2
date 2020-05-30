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
  venue: String
});

const Consultation = mongoose.model("Consultation", consultationSchema, "consultations");

module.exports = Consultation;