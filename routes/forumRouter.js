const express = require("express");

// create router
const forumRouter = express.Router();

const forumController = require("../controllers/forumController.js");

// route that retrieves all forums if there is no query
// upon query, searches for specific forums
forumRouter.get('/', forumController.showForums);

//add post 
forumRouter.post('/',forumController.addforum);

//search post by id
forumRouter.get('/:_id',forumController.getforumByID);

module.exports = forumRouter;