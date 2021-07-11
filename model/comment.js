const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    reader: {
        type: String,
        required: true,
    },
    discussion: {
        type: String,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("comment", commentSchema);
