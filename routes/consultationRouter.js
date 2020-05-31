const express = require("express");
const consultationValidator = require("../validators/consultationValidator.js");

// create router
const consultationRouter = express.Router();

const consultationController = require("../controllers/consultationController.js");

// route that loads the consultation home
consultationRouter.get('/', consultationController.loadConsultationHome);

// route that loads new consultation form
consultationRouter.get('/new', consultationController.loadConsultationForm);

// route that creates a new consultation
consultationRouter.post('/new', consultationValidator.newConsultation, consultationController.newConsultation);

// route that retrieves all the consultations associated with the user
consultationRouter.get('/manage', consultationController.getUserConsultations);

// route that loads edit form for consultation
consultationRouter.get('/manage/:_id', consultationController.loadEditConsultation);

// route that updates existing consultation
consultationRouter.post('/manage/:_id', consultationController.updateConsultation);

// route that deletes consultation
consultationRouter.delete('/manage/:_id', consultationController.deleteConsultation);

module.exports = consultationRouter;