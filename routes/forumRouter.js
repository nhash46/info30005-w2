const express = require("express");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// empty path = retrieve all authors 
forumRouter.get("/", forumController.getAllForumPosts);
//editing forum comments
forumRouter.post("/edit-comment", forumController.editComment);

module.exports = forumRouter;