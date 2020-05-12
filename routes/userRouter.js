const express = require("express");

// create router
const userRouter = express.Router();

const userController = require("../controllers/userController.js");

userRouter.get("/signup", userController.newUserForm);
// adding a new user i.e. signing up
userRouter.post("/signup", userController.addUser);

// viewing all users (**** REMEMBER TO REMOVE BEFORE DELIVERABLE DUE DATE ****)
userRouter.get("/", userController.getAllUsers);

userRouter.get("/login", userController.loginPage);

// logging in
userRouter.post("/login", userController.logIn);

// creating a new consultation
userRouter.post("/consultations", userController.newConsultation);

// viewing all consultations
userRouter.get("/consultations", userController.getAllConsultations);

module.exports = userRouter;