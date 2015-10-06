var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var JournalUser = new Schema({
  email: String,
  password: String
});


module.exports = mongoose.model('journalUsers', JournalUser);
