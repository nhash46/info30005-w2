const express = require("express");
const commentValidator = require("../validators/commentValidator.js");

// create router
const commentRouter = express.Router();

const commentController = require("../controllers/commentController.js");

//commment on particular post
commentRouter.post('/:_id', commentValidator.addComment, commentController.addComment);

commentRouter.get('/', commentController.getAllComments);

commentRouter.get('/:title', commentController.getCommentByTitle);

//edit form post by id
commentRouter.get('/edit/:_id', commentController.ensureAuthenticated, commentController.editComment);

//update forum post by id
commentRouter.post('/edit/:_id' , commentController.updateComment);

// delete forum post by id
commentRouter.delete('/:_id', commentController.deleteComment);

module.exports = commentRouter;