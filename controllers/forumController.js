const mongoose = require("mongoose");
<<<<<<< HEAD
const uuidv4 = require('uuid/v4');
=======
>>>>>>> master
const crypto = require("crypto");

// import forum model
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

// function to handle request to add post
const addforum = (req, res) => {
 // extract info. from body
  var newPost = new Post({
    id: crypto.randomBytes(16).toString("hex"),
    title: req.body.title,
    body: req.body.body,
    //comments: []
  })
  // add post into db
  newPost.save(function (err, Post) {
    if (err) return console.error(err);
  });
  res.send("Post added!");
};
<<<<<<< HEAD
  
=======

    
>>>>>>> master
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
// get pst by ID
const getforumByID = (req, res) => {
  console.log(req.params.id);


  // search for forum in the database via ID
  const searchedPost = Post.find({"Post.id" : "req.params.id" });

  if (searchedPost) {
    // send back the forum details
    res.send(searchedPost);
  } else {
    // message to retrun id has not been found 
    res.status(400)
    res.send("No post with mentioned ID");
  }
};


// function to handle a request to a particular forum
const getforumByID = async (req, res) => {
  try{
    const post = await Post
    .find({'_id': req.params._id})
    .populate('comment')
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
    
  try {
    const all_comments = await Comment.find();
    return res.send(all_comments);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};


// gets a comment from a title query
const getCommentByTitle = async (req, res) => {
  try{
    const comment = await Comment
  .find({'title': req.params.title})
  .populate('parentPost')
  return res.send(comment);
  }
  catch(err) {
    res.status(400);
    return res.send("Database query failed");
  }
}

// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
<<<<<<< HEAD
  getforumByID
  //updateforum
};
=======
  getforumByID,
  addComment,
  getAllComments,
  getCommentByTitle
};
>>>>>>> master
