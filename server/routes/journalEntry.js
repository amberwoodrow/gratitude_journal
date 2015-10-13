var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var JournalEntry = require('../models/journalEntry.js');
var JournalUser = require('../models/user.js');


router.post('/journalEntry', function(req, res, next) {
  var date = new Date();
  var dbDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
  dbDate = dbDate.toString();

  // Find the user via Mongoose, store in variable
  JournalUser.findOne({'_id': req.body.currentUser._id}, 'id entries', function(err, data){
    var user = data;
    var entries = data.entries;

    JournalEntry.findOneAndUpdate({'postedBy': user, 'timeStamp': dbDate}, {'items': req.body.items}, {'upsert': true}, function(){
      if(err){
        res.json({'message': err});
      } else {
        user.entries = data;

        user.save(function(err, data){
          if(err){
            res.json({'message': err});
          } else {
            // res.json(data);
          }
        });
      }
    });
  });

});

router.get('/journalEntries', function(req, res, next) {
  JournalEntry.find({'postedBy': req.query._id, 'timeStamp': req.query.timeStamp})
  .exec(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// (Refs to children in http://mongoosejs.com/docs/populate.html)

module.exports = router;
