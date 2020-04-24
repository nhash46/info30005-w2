const mongoose = require("mongoose");

// import forum model
const Post = mongoose.model("Forum");

    
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


const editComment = async (req, res) => {
  res.send("Working on this feature");
  /*await Post.updateOne(
    {title:req.params.title},
    {
      $set:{'comments':req.body}
    }
  );
  */
  
  /*const new_comment=req.body;
  //search by ID
  const forum = forum.find(forum => forum.id === req.params.id);
  if(!forum){
    //cannot be found
    return res.send([])
  }
  //now merge with original forum
  //assumed user well-informed ( a dangerous assumption)
  Object.assign(forum.comment, new_comment);
  forum.save(function (err, user) {
    if (err) return console.error(err);
  });

  //return updated forum
  res.send(forum);*/


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

// function to modify forum by ID
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
  editComment,
  //getforumByID,
  //addforum,
  //updateforum
};
