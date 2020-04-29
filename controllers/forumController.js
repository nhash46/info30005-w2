const mongoose = require("mongoose");
const crypto = require("crypto");

// import forum model
const Post = mongoose.model("Post");

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
    return res.send("Database query failed!!!!!!");
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

// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID,
};
