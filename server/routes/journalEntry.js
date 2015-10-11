var express = require('express');
var router = express.Router();
var journalEntry = require('../models/journalEntry.js');


router.get('/journalEntry', function(req, res, next) {
  JournalEntry.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.get('/journalEntry/:id', function(req, res, next) {
  JournalUser.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/journalEntries', function(req, res, next) {
  newjournalEntry = new JournalEntry({
    email: req.body.email,
    password: req.body.password
  });
  newjournalEntry.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});