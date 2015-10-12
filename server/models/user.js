var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var JournalUser = new Schema({
  email: String,
  password: String,
  entries: [{ type: Schema.Types.ObjectId, ref: 'JournalEntry' }]
});

module.exports = mongoose.model('JournalUser', JournalUser);
