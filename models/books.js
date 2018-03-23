const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Book = new Schema({
    title: String,
    owner: String,
    thumbnail: String,
    requester: String,
    isTraded: Boolean,
    isApproved: Boolean

});

module.exports = mongoose.model('Book', Book);
