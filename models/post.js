const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    call: {type: String, required: true},
    cover: {type: String, required: true},
    content: {type: String, required: true},
    published: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);