const express = require("express");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// empty path = retrieve all authors 
forumRouter.get('/', forumController.getAllForumPosts);

//add post 
forumRouter.post('/',forumController.addforum);

//commment on particular post
forumRouter.post('/comment/:_id',forumController.addComment);

//search post by id
forumRouter.get('/:_id',forumController.getforumByID);

forumRouter.get('/comment/', forumController.getAllComments);

forumRouter.get('/comment/:title', forumController.getCommentByTitle);

module.exports = forumRouter;