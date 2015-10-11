var mongoose = require('mongoose');

var JournalEntry = new mongoose.Schema({
    // title: String,
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'JounalUser'
    // },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JournalUser'
        }
    }]
});

module.exports = mongoose.model("journalEntries", JournalEntry);