const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    user :{
        type: String,
        required: true,
        trim: true
    },
    title :{
        type: String,
        required: true,
        trim: true
    },
    description :{
        type: String,
        required: true,
        trim: true
    },
    date :{
        type: String,
        default: new Date()
    },
})

module.exports = mongoose.model('post', PostSchema)