const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  body: String,
  comments : [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  date: {type: Date, default: Date.now}
});

const Post = mongoose.model("Post", forumPostSchema, "forum_posts");

module.exports = Post;