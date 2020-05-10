const mongoose = require("mongoose");

const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

const forumController = require("../controllers/forumController.js");

// adds a comment to comment collection
var i = 0;
const addComment = async (req, res) => {
  
    var newComment = new Comment({
      title : req.body.title,
      content : req.body.content,
      parentPost : req.params._id
    })

    // need to add this Id to Parent document 'comment' field 
    try{
        const filter = { _id: req.params._id};
        const update = { "$push" : {"comments" : newComment._id}};
        let post = await Post.findOneAndUpdate(filter, update, {new : true});
        console.log(post.comment);
    } catch(err){
        res.status(400);
        return res.send("Database query failed");
    }

    // add comment to database
    newComment.save(function (err) {
      if (err) return console.error(err);
    });
    res.send("Comment created successfully");
  };
  
  // 
  const getAllComments = async (req, res) => {  
    try{
    const all_comments = await Comment.find();
    return res.send(all_comments);
    }
    catch (err) {
      res.status(400);
      return res.send("Database query failed");
    }
  };
  

  // gets a comment from a title query
  const getCommentByTitle = async (req, res) => {
    try{
      const comment = await Comment.find({'title': req.params.title});
  
      return res.send(comment);
    }
    catch(err) {
      res.status(400);
      return res.send("Database query failed");
    }
  };

  // gets a comment by parentId

  const getCommentByParentId = async (req, res) => {
    try{
      const comment = await Comment.find({'parentPost': req.params._id});
  
      return res.send(comment);
    }
    catch(err) {
      res.status(400);
      return res.send("Database query failed");
    }
  }

  module.exports = {
    addComment,
    getAllComments,
    getCommentByTitle,
    getCommentByParentId
  };