const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
            name:{
                type: String,
                required: true,
                max: 500,
                min: 6,
            },
            description:{
                type: String,
                required: true,
            },
            date:{
                type: Date,
                required: true,
                default: Date.now()

            },
            writer:{
                type: String,
                required: true,
            },
            photoPath:{
                type: String,
                required: true,

            }
},
);


module.exports = mongoose.model('podcast', podcastSchema);