// database schema

const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    password: String
}, {
    collection: 'users'
});

module.exports = userSchema;