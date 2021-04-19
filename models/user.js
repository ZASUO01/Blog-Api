const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    icon_id: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true}
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);