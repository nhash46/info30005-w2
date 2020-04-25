const mongoose = require("mongoose");
const crypto = require("crypto");

// import forum model
const Post = mongoose.model("Forum");

// function to handle request to add post
const addforum = (req, res) => {
 // extract info. from body
  var newPost = new Post({
    id: crypto.randomBytes(16).toString("hex"),
    title: req.body.title,
    body: req.body.body
  })
  // add post into db
  newPost.save(function (err, Post) {
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

  try {
    const forum = await Post.find({'id': req.params.id});
    return res.send(forum);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }

};

// function to modify forum by IDy
const updateForum = (req, res) => {
  const new_forum = req.body;

  // search for forum in the database via ID
  const forum = forums.find(forum => forum.id === req.params.id);
  if (!forum) {
	  // cannot be found
	  return res.send([]);
  }

  // now merge new_forum into the original forum object
  // it is assumed that user input is well-formed (a dangerous assumption)
  Object.assign(forum, new_forum);

  // return updated forum
  res.send(forum);
};

// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID,
  updateForum
};
