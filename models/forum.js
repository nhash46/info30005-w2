const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
  comments: [String]
});

const Post = mongoose.model("Forum", forumPostSchema, "forum_posts");

module.exports = Post;