var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var JournalEntry = new mongoose.Schema({
  entry: [],
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JournalUser'
  },
  timeStamp: Number
});

module.exports = mongoose.model("JournalEntry", JournalEntry);