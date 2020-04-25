const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  comment : {
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }
});

const Post = mongoose.model("Forum", forumPostSchema, "forum_posts");

module.exports = Post;