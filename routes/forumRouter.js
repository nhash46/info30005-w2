const express = require("express");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// empty path = retrieve all authors 
forumRouter.get('/', forumController.getAllForumPosts);

// form page for new post
forumRouter.get('/submit', forumController.newForumForm);

//add post 
forumRouter.post('/submit',forumController.addforum);

//search post by id
forumRouter.get('/:_id',forumController.getforumByID);

//edit form post by id
forumRouter.get('/edit/:_id' , forumController.editForum);

//update forum post by id
forumRouter.post('/edit/:_id' , forumController.updateForum);

module.exports = forumRouter;