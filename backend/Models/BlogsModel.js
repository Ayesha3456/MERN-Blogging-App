const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogsSchema = new Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    }
});

const BlogsModel = mongoose.model('blogs', BlogsSchema);
module.exports = BlogsModel;