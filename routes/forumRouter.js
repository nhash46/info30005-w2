const express = require("express");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// empty path = retrieve all authors 
forumRouter.get('/', forumController.getAllForumPosts);

//add post 
forumRouter.post('/',forumController.addforum);

//commment on particular post
forumRouter.post('/:_id',forumController.updateForum);

//search post by id
forumRouter.get('/:_id',forumController.getforumByID);

module.exports = forumRouter;