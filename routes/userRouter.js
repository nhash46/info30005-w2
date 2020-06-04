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

// get all posts made by particular user
userRouter.get("/profile/:id", userController.getUserPosts);

module.exports = userRouter;