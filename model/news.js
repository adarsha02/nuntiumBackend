const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
            category: {
                type: String,
                required: true,
                max: 200

            },
            headline:{
                type: String,
                required: true,
                max: 500,
                min: 6,
            },
            article:{
                type: String,
                required: true,
                max: 2000,
                min: 6
            },
            date:{
                type: Date,
                required: true,
                default: Date.now()

            },
            keyword:{
                type: String,
                required: true,
            },
            photoPath:{
                type: String,
                required: true,
                default: "https://res.cloudinary.com/adarsha02/image/upload/v1626092858/old-newspaper-350376_1920_cs8hbu.jpg",

            },
            views:{
                type: Number,
                required: true,
                default: 0,
            },
            up:{
                type: Number,
                required: false,
                default: 0
                
            },
            down:{
                type: Number,
                required: false,
                default: 0,
                
            },
            writer:{
                type: String,
                required: true,
            }

},
{collection: 'news'}
);


module.exports = mongoose.model('news', newsSchema);