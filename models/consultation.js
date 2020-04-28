const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  student: {
      type: Schema.Types.ObjectId, ref: 'User'
  },
  counsellor: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  date: String,
  time: String,
  isOnline: {
      type: Boolean,
      default: true
  }
});

const Consultation = mongoose.model("Consultation", consultationSchema, "consulations");

module.exports = Consultation;