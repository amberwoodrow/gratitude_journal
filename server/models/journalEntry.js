var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var JournalEntry = new mongoose.Schema({
  items: [],
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JournalUser'
  },
  timeStamp: String
});

module.exports = mongoose.model("JournalEntry", JournalEntry);