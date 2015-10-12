var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var JournalEntry = require('../models/journalEntry.js');
var JournalUser = require('../models/user.js');


router.post('/journalEntry', function(req, res, next) {
  // Find the user via Mongoose, store in variable
  JournalUser.findOne({'_id': req.body.currentUser._id}, 'id entries', function(err, data){
    var user = data;
    var entries = data.entries;
    console.log('req.body', req.body.entry[0]);


    // Create a new entry
    newjournalEntry = new JournalEntry({
      postedBy: user,
      entry: req.body.entry[0]
    });

    // console.log('newjournalEntry', newjournalEntry);
    // Store the new journal entry in the user
    user.entries.push(newjournalEntry);
    // Save the user
    user.save(function(err, data){
      if(err){
        res.json({'message': err});
      } else {
        // res.json(data);
      }
    });

    // user.populate(entries)
    // .exec(function(err, data){
    //   if(err){
    //     res.json({'message': err});
    //   } else {
    //     res.json(data);
    //   }
    // });

    // Save the journal entry
    newjournalEntry.save(function(err, data){
      if(err){
        res.json({'message': err});
      } else {
        res.json(data);
      }
    });
  });

});

// Person
// .findOne({ name: 'Aaron' })
// .populate('stories') // only works if we pushed refs to children
// .exec(function (err, person) {
//   if (err) return handleError(err);
//   console.log(person);
// })

router.get('/journalEntries', function(req, res, next) {
  JournalUser.findOne({'_id': req.query._id})
  .populate('entries')
  .exec(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      // console.log(data.entries[0].entry);
      res.json(data.entries);
    }
  });
});

// (Refs to children in http://mongoosejs.com/docs/populate.html)

module.exports = router;
