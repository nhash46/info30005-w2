const mongoose = require("mongoose");

// import forum model
const Forum = mongoose.model("Post");

// function to handle request to add post
const addforum = (req, res) => {
 // extract info. from body

  var newPost = new Forum({
    title: req.body.title,
    body: req.body.body
  });

  // add post into db
  newPost.save(function (err) {
    if (err){
      console.log(err);
    }
    else{
      //req.flash('success','Post Added');
      res.redirect('/forum-posts');
    } 
  });
  
};

// function that loads form page for adding post
const newForumForm = (req, res) => {
  res.render('add_forum', {
    title:'Create a post'
  });
}

    
// function to handle a request to get all forums
const getAllForumPosts = async (req, res) => {
    
  Forum.find({}, function(err, forums){

    if(err){
      console.log(err);
    } else {
      res.render("forum-posts", {
        title: 'Forums',
        forums: forums
      });
    }
  });
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
  getforumByIDComment,
  newForumForm
};
