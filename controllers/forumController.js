const mongoose = require("mongoose");
const flash = require('connect-flash');
const {validationResult} = require('express-validator/check');

// import forum model
const Forum = mongoose.model("Post");

// import commment model
const Comment = mongoose.model("Comment");

// import user model
const User = mongoose.model("User");

// function to handle request to add post
const addforum = (req, res) => {

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.render('add_forum',
    { 
      title: 'Create a post',
      errors: errors.mapped()
    });
  } else {
      // extract info. from body
    var newPost = new Forum({
      title: req.body.title,
      author: req.user.username,
      body: req.body.body
    });

    // add post into db
    newPost.save(function (err) {
      if (err){
        console.log(err);
      }
      else{
        req.flash('success','Post Added');
        res.redirect('/forum-posts');
      } 
    });
  } 
};

// function that loads form page for adding post
const newForumForm = (req, res) => {
  res.render('add_forum', {
    title:'Create a post',
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

  Forum.findById(req.params._id).populate('comments').exec(function(err, forum){

    res.render('view_forum', {
      forum: forum
    });
  });
};

// access control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/user/login')
  }
}


// backend function involved in updating a posts comment field upon adding a Comment. See commentController addComment().
var getforumByIDComment = async (req, res) => {
  
  try {
    const post = await Forum.find({'_id': req.params._id});
  } catch (err) {
    return console.error(err);
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

// Load Edit Form
const editForum = async (req, res) => {

  Forum.findById(req.params._id, function(err, forum){
    if(forum.author != req.user._id){
      req.flash('danger', 'Not authorised to edit this post');
      res.redirect('/forum-posts');
    }
    else {
      res.render('edit_forum', {
        title: 'Edit Forum',
        forum: forum
      });
    }
  });
}

// function to handle request to edit post
const updateForum = (req, res) => {
  // extract info. from body

  let forum = {};

  forum.title = req.body.title;
  forum.body = req.body.body;
   
  let query = {_id:req.params._id}
 
   // add post into db
  Forum.updateOne(query, forum, function (err) {
    if (err){
      console.log(err);
    }
    else{
      req.flash('success','Post Updated');
      res.redirect('/forum-posts');
    } 
  });
}

// function to handle request to delete post
const deleteForum = (req, res) => {
  // check if user is logged in
  if(!req.user._id){
    res.status(500).send();
  }
  let query = {_id:req.params._id}

  // check if user is the author of post
  Forum.findById(req.params.id, function(err, forum){
    if(forum.author != req.user._id){
      res.status(500).send();
    } 
    else {
      Forum.remove(query, function(err){
        if(err){
          console.log(err);
        }
        req.flash('success','Post Deleted');
        res.send('Success');
      });
    }
  });
}



// remember to export the functions
module.exports = {
  getAllForumPosts,
  addforum,
  getforumByID,
  getforumByIDComment,
  newForumForm,
  getCommentByParentId,
  editForum,
  updateForum,
  deleteForum,
  ensureAuthenticated
};
  //getforumByID,
  //addComment,
  //getAllComments,
  //getCommentByTitle

