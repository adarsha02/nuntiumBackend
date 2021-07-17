const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    reader: {
        type: String,
        required: true,
    },
    news: {
        type: String,
        required: true,
        
    },
});

module.exports = mongoose.model("bookmark", bookmarkSchema);
