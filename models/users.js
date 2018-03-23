const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const User = new Schema({
    email: String,
    password: String,
    displayName: String,
    city: String,
    state: String
});

module.exports = mongoose.model('User', User);
