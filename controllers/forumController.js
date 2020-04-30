const mongoose = require("mongoose");

// import forum model
const Post = mongoose.model("Post");

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
  newPost.save(function (err) {
    if (err) return console.error(err);
  });
  res.send("Post added!");
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
/* // get pst by ID
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
*/

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
  //getforumByID,
  //addComment,
  //getAllComments,
  //getCommentByTitle

