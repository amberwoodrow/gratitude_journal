var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var JournalUser = new Schema({
  email: String,
  password: String
});

JournalUser.plugin(passportLocalMongoose); 

module.exports = mongoose.model('journalUsers', JournalUser);
