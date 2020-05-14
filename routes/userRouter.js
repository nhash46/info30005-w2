const express = require("express");
const userValidator = require("../validators/userValidator.js");
const passport = require('passport');

// create router
const userRouter = express.Router();

const userController = require("../controllers/userController.js");

// load for to create an account
userRouter.get("/signup", userController.newUserForm);

// adding a new user i.e. signing up
userRouter.post("/signup", userValidator.addUser, userController.addUser);

// viewing all users (**** REMEMBER TO REMOVE BEFORE DELIVERABLE DUE DATE ****)
userRouter.get("/", userController.getAllUsers);

// get user profile
userRouter.get("/:id", userController.getUserByID);

// log in form
userRouter.get("/login", userController.loginPage);

// logging in
userRouter.post("/login", userController.logIn);

// creating a new consultation
userRouter.post("/consultations", userController.newConsultation);

// viewing all consultations
userRouter.get("/consultations", userController.getAllConsultations);

// logging out
userRouter.get("/logout", userController.logOutUser);

module.exports = userRouter;