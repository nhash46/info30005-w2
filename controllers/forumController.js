const mongoose = require("mongoose");

// import forum model
const Post = mongoose.model("Forum");

// function to handle request to add post
const addforum = (req, res) => {
 // extract info. from body
  var newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    comments: []
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
// get pst by ID
const getforumByID = (req, res) => {
  console.log(req.params.id);


  // search for forum in the database via ID
  const searchedPost = Post.find(Post => Post._id === req.params.id);

  if (searchedPost) {
    // send back the forum details
    res.send(searchedPost);
  } else {
    // message to retrun id has not been found 
    res.status(400)
    res.send("No post with mentioned ID");
  }
};


/*// function to handle a request to a particular forum
const getforumByID = (req, res) => {
  // search for forum in the database via ID
  const forum = forums.find(forum => forum.id === req.params.id);

  if (forum) {
    // send back the forum details
    res.send(forum);
  } else {
    // you can decide what to return if forum is not found
    // currently, an empty list will be returned
    res.send([]);
  }
};

// function to handle request to add forum
const addforum = (req, res) => {
  // extract info. from body
  const forum = req.body;

  // add forum to array
  forums.push(forum);
  res.send(forums);
};

// function to modify forum by IDy
const updateforum = (req, res) => {
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
*/
// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID
  //updateforum
};
