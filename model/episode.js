const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
    podcast: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        max: 500,
        min: 6,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    audioPath: {
        type: String,
        required: true,
    },
    guest: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model("episode", episodeSchema);
