const express = require("express");

// create router
const commentRouter = express.Router();

const commentController = require("../controllers/commentController.js");

//commment on particular post
commentRouter.post('/:_id', commentController.addComment);

// get all comments
//commentRouter.get('/', commentController.getAllComments);

// find comment to edit
commentRouter.get('/:_id/edit', commentController.ensureAuthenticated, commentController.editComment);

// update comment
commentRouter.post("/edit/:_id", commentController.ensureAuthenticated, commentController.updateComment);

// delete comment by id
commentRouter.delete('/:_id', commentController.deleteComment);


module.exports = commentRouter;