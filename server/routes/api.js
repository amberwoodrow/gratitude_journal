var express = require('express');
var router = express.Router();
var JournalUser = require('../models/user.js');

router.get('/journalUsers', function(req, res, next) {
  JournalUser.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.get('/journalUser/:id', function(req, res, next) {
  JournalUser.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/journalUsers', function(req, res, next) {
  newjournalUser = new JournalUser({
    email: req.body.email,
    password: req.body.password
  });
  newjournalUser.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// // put a beer
// router.put('/beer/:id', function(req, res, next) {
//   var update = {
//     name: req.body.name,
//     type: req.body.type,
//     abv: parseFloat(req.body.abv)
//   };
//   Beer.findByIdAndUpdate(req.params.id, update, function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

// // delete a beer
// router.delete('/beer/:id', function(req, res, next) {
//   Beer.findByIdAndRemove(req.params.id, function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

module.exports = router;