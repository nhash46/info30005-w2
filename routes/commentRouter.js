const express = require("express");

// create router
const commentRouter = express.Router();

const commentController = require("../controllers/commentController.js");

//commment on particular post
commentRouter.post('/:_id', commentController.addComment);

// get all comments
commentRouter.get('/', commentController.getAllComments);


module.exports = commentRouter;