const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId, 
    ref: 'User'
  },
  counsellor: {
    type: mongoose.Types.ObjectId, 
      ref: 'User'
  },
  date: Date,
  time: String,
  isOnline: {
      type: Boolean,
      default: true
  }
});

const Consultation = mongoose.model("Consultation", consultationSchema, "consultations");

module.exports = Consultation;