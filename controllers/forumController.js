const mongoose = require("mongoose");

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
    if (err){
      return res.send("Whoops! Both title and body fields are required");
    }
    else{
      return res.send("Post added!");
    } 
  });
  
};

    
// function to handle a request to get all forums
const getAllForumPosts = async (req, res) => {
    
  try {
    const all_posts = await Post.find().populate("comments");
    return res.send(all_posts);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// function to handle a request to a particular forum
const getforumByID = async (req, res) => {
  try {
    const forum = await Post.find({'_id': req.params._id});
    return res.send(forum);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed!!!!!!");
  }
};


// backend function involved in updating a posts comment field upon adding a Comment. See commentController addComment().
var getforumByIDComment = async (req, res) => {
  try {
    const post = await Post.find({'_id': req.params._id});
    return post;
  } catch (err) {
    return console.error(err);
  }
};


// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID,
  getforumByIDComment
};
