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
      body: req.body.body,
      date: Date.now()
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

// function to search for forums upon query
const showForums = (req, res) => {
    const searchQuery = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all forums from DB
        Forum.find({title: regex}, function(err, allForums){
           if(err){
               console.log(err);
           } else {
              if(allForums.length < 1) {
                  req.flash("error", "No forums found");
                  return res.redirect("/forum-posts");
              }
              res.render("forum-posts",
              {
                title: 'Forums',
                searchQuery: req.query.search,
                forums:allForums, 
              });
           }
        });
    } else {
        // Get all campgrounds from DB
        Forum.find({}, function(err, allForums){
           if(err){
               console.log(err);
           } else {
              res.render("forum-posts",
              {
                title: 'Forums',
                forums: allForums
              });
           }
        });
    }
}

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
    if(forum.author != req.user.username){
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
  Forum.findById(query, function(err, forum){
    if(forum.author != req.user.username){
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
  ensureAuthenticated,
  showForums
};
