const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                min: 6,
                max: 200

            },
            email:{
                type: String,
                required: true,
                max: 255,
                min: 6,
                

            },
            password:{
                type: String,
                required: true,
                max: 1024,
                min: 6
            },
            phone:{
                type: String,
                required: true,
                max: 15,
                min:5,

            },
            address:{
                type: String,
                required: true,
                max: 1000,
                min: 7,

            },
            photoPath:{
                type: String,
                required: false,
                max:3000,
                min: 5

            },
            newsChoice:{
                type: [String],
                required: false,
            }
});


module.exports = mongoose.model('reader', readerSchema);