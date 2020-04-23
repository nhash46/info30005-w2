const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String
});

const Post = mongoose.model("forum_posts", forumPostSchema);
module.exports = Post;