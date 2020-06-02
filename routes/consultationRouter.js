const express = require("express");
const consultationValidator = require("../validators/consultationValidator.js");

// create router
const consultationRouter = express.Router();

const consultationController = require("../controllers/consultationController.js");

// route that loads the consultation home
consultationRouter.get('/', consultationController.loadConsultationHome);

// route that loads new consultation form
consultationRouter.get('/new', consultationController.ensureAuthenticated, consultationController.loadConsultationForm);

// route that creates a new consultation
consultationRouter.post('/new', consultationValidator.newConsultation, consultationController.newConsultation);

// route that retrieves all the consultations associated with the user
consultationRouter.get('/manage', consultationController.getUserConsultations);

// route that loads edit form for consultation
consultationRouter.get('/manage/:_id', consultationController.loadEditConsultation);

// route that updates existing consultation
consultationRouter.post('/manage/:_id', consultationValidator.newConsultation, consultationController.updateConsultation);

// route that deletes consultation
consultationRouter.delete('/manage/:_id', consultationController.deleteConsultation);

// route that retrieves pending consultations for counsellors to accept
consultationRouter.get('/requests', consultationController.getPendingConsultations);

// route that changes status of consultation from pending to confirmed
consultationRouter.post('/requests/:_id', consultationController.acceptRequest);

// route that shows confirmed consultations belonging to the user (given they are a counsellor)
consultationRouter.get('/confirmed', consultationController.getConfirmedConsultations);

module.exports = consultationRouter;