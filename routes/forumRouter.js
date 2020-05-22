const express = require("express");
const forumValidator = require("../validators/forumValidator.js");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// route that retrieves all forums if there is no query
// upon query, searches for specific forums
forumRouter.get('/', forumController.showForums);

// form page for new post
forumRouter.get('/submit', forumController.ensureAuthenticated, forumController.newForumForm);

//add post 
forumRouter.post('/submit', forumValidator.addForum, forumController.addforum);

//search post by id
forumRouter.get('/:_id',forumController.getforumByID);

//edit form post by id
forumRouter.get('/edit/:_id', forumController.ensureAuthenticated, forumController.editForum);

//update forum post by id
forumRouter.post('/edit/:_id' , forumController.updateForum);

// delete forum post by id
forumRouter.delete('/:_id', forumController.deleteForum);

module.exports = forumRouter;