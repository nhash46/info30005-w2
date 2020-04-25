const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    title: String,
    content: String,
    parentPost : {type: mongoose.Types.ObjectId, ref: "Post"}
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;