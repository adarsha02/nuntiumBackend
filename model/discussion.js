const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
            headline:{
                type: String,
                required: true,
                max: 500,
                min: 6,
            },
            category:{
                type: String,
                required: true,
            },
            subheadline:{
                type: String,
                required: true,

            },
            opinion:{
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
            writer:{
                type: String,
                required: true,
            }

},
{collection: 'discussion'}
);


module.exports = mongoose.model('discussion', discussionSchema);