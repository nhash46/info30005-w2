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
//userRouter.get("/", userController.getAllUsers);

// log in form
userRouter.get("/login", userController.loginPage);

// logging in
userRouter.post("/login", userController.logIn);

// logging out
userRouter.get("/logout", userController.logOutUser);

// get user profile
userRouter.get("/profile", userController.getUserProfile);

// get edit profile page
userRouter.get("/profile/edit/:_id", userController.editProfile);

// edit user profile
userRouter.post("/profile/edit/:_id", userController.updateProfile);

// get change password pages
userRouter.get("/change-password", userController.getChangePassword);

// function to set new password
userRouter.post("/change-password", userValidator.changePassword, userController.changePassword);

// get all posts made by particular user
userRouter.get("/profile/:id", userController.getUserProfileByID);

module.exports = userRouter;