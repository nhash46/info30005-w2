const express = require("express");

// create router
const userRouter = express.Router();

const userController = require("../controllers/userController.js");

// adding a new user i.e. signing up
userRouter.post("/signup", userController.addUser);

/*
// log in
userRouter.post("/login", userController.logIn);
*/

module.exports = forumRouter;