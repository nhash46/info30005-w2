const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forumPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments : [
    {
      comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    }
  ] 
});

const Post = mongoose.model("Post", forumPostSchema, "forum_posts");

module.exports = Post;