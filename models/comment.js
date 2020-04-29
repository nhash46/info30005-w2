const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    title: {type: String},
    content: {type: String},
    parentPost : {
        type: Schema.Types.ObjectId, 
        ref: "Post"
    }
});

const Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;