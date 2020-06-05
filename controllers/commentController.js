const mongoose = require("mongoose");

const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

const forumController = require("../controllers/forumController.js");

// adds a comment to comment collection
const addComment = async (req, res) => {

    var newComment = new Comment({
      author : req.user.username,
      content : req.body.content,
      parentPost : req.params._id,
      date: Date.now()
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
    res.redirect('/forum-posts/'+req.params._id);
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

  // access control
  const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
           Comment.findById(req.params._id, function(err, foundComment){
              if(err){
                  res.redirect("back");
              }  else {
                  // checks if user is author of comment
               if(foundComment.author == req.user.username) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
              }
           });
       } else {
           req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
   }

   // function to find comment to be edited
   const editComment = (req, res) =>{
    Comment.findById(req.params._id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.redirect("forum-posts/" + foundComment.parentPost)
      }
   });
  };

  // function to save update to comments
  const updateComment = (req, res) => {
    // extract info. from body

    let comment = {};

    comment.content = req.body.content;
    
    let query = {_id:req.params._id}
  
    // add post into db
    Comment.updateOne(query, comment, function (err) {
      if (err){
        console.log(err);
      }
      else{
        req.flash('success','Comment Updated');
        res.redirect('back');
      } 
    });
  }
  

  // function to handle request to delete comment
const deleteComment = (req, res) => {
  // check if user is logged in
  if(!req.user._id){
    res.status(500).send();
  }
  let query = {_id:req.params._id}

  // check if user is the author of post
  Comment.findById(query, function(err, comment){
    if(comment.author != req.user.username){
      res.status(500).send();
    } 
    else {
      Comment.remove(query, function(err){
        if(err){
          console.log(err);
        }
        req.flash('success','Comment deleted');
        res.send('Success');
      });
    }
  });
}


  module.exports = {
    addComment,
    getAllComments,
    getCommentByTitle,
    getCommentByParentId,
    ensureAuthenticated,
    editComment,
    updateComment,
    deleteComment
  };