const mongoose = require("mongoose");
const crypto = require("crypto");

// import forum model
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

// function to handle request to add post
const addforum = (req, res) => {
 // extract info. from body
  var newPost = new Post({
    title: req.body.title,
    body: req.body.body
  })
  // add post into db
  newPost.save(function (err) {
    if (err) return console.error(err);
  });
  res.send("Post added!");
};

    
// function to handle a request to get all forums
const getAllForumPosts = async (req, res) => {
    
  try {
    const all_posts = await Post.find();
    return res.send(all_posts);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};


// function to handle a request to a particular forum
const getforumByID = async (req, res) => {
  try{
    const post = await Post
    .find({'_id': req.params._id})
    .populate('comments')
    return res.send(post);
  }
  catch(err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

  /*db.Post.findOne({_id : req.params.id })
  .populate("comment")
  .then(function(dbPost) {

    // If we were able to successfully find an Post with the given id, send it back to the client
    res.json(dbPost);
  })
  .catch(function(err) {
    // If an error occurred, send it to the client
    res.json(err);
  });*/


// adds a comment to comment collection
const addComment = (req, res) => {
  
  var newComment = new Comment({
    title : req.body.title,
    content : req.body.content,
    parentPost : req.params._id
  })

  // add user to database
  newComment.save(function (err) {
    if (err) return console.error(err);
  });
  res.send("Comment created successfully");
};

// 
const getAllComments = async (req, res) => {  
    console.log('hello');
    res.send('hello');
    const all_comments = await Comment.find();
    return res.send(all_comments);
  /*catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }*/
};


// gets a comment from a title query
const getCommentByTitle = async (req, res) => {
  res.send("hello");
  try{
    const comment = await Comment.find({'title': req.params.title});

    comment.populate('parentPost').execPopulate();

    return res.send(comment);
  }
  catch(err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID,
  addComment,
  getAllComments,
  getCommentByTitle
};
