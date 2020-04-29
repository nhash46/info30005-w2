const express = require("express");

// create router
const commentRouter = express.Router();

const commentController = require("../controllers/commentController.js");

//commment on particular post
commentRouter.post('/:_id', commentController.addComment);

forumRouter.get('/', commentController.getAllComments);

forumRouter.get('/:title', commentController.getCommentByTitle);

module.exports = commentRouter;