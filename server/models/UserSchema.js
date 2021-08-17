const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
});
const user = mongoose.model('user', userSchema);
module.exports = user;