const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: String,
  body: String,
  comments : [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }]
});

const Post = mongoose.model("Post", forumPostSchema, "forum_posts");

module.exports = Post;