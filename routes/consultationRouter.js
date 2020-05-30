const express = require("express");
const ObjectID = require('mongodb').ObjectID;

// create router
const consultationRouter = express.Router();

const consultationController = require("../controllers/consultationController.js");

// route that retrieves all the consultations associated with the user
consultationRouter.get('/', consultationController.getUserConsultations);

// route that creates a new consultation
consultationRouter.post('/', consultationController.newConsultation);

module.exports = consultationRouter;