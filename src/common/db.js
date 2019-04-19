const mongoose = require('mongoose');

//mongoose.connect('mongodb://mocadmin:mocadmin@139.59.35.239:27017/admin', {useCreateIndex: true, useNewUrlParser: true});


mongoose.connect('mongodb://localhost:27017/moodcafe', {useCreateIndex: true, useNewUrlParser: true});

mongoose.Promise = global.Promise;

module.exports = {
    User: require('../Users/user.model'),
    Book: require('../Books/book.model'),
    Purchase: require('../Purchase/purchase.model')
};