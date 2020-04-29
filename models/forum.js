const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumPostSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  body: String,
  comments : [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

const Post = mongoose.model("Post", forumPostSchema, "forum_posts");

module.exports = Post;