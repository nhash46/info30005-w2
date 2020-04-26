const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    parentPost : {type: mongoose.Types.ObjectId, ref: "Post"}
});

const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;