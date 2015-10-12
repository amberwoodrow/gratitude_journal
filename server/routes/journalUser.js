var express = require('express');
var router = express.Router();
var JournalUser = require('../models/user.js');
var JournalEntry = require('../models/journalEntry.js');


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

// do I need another route file for login
router.post('/login', function(req, res, next) {
  JournalUser.findOne({'email': req.body.email}, 'email password', function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      if (data === null) {
        res.status(401).json({"message": "Email not found"});
      } else {
        if (data.password === req.body.password) {
          res.json(data);
        } else {
          res.status(401).json({"message": "Wrong password"});
        }
      }
    }
  });
});

module.exports = router;






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

// router.get('/journalUsers', function(req, res, next) { //admin 
//   JournalUser.find(function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.get('/journalUser/:id', function(req, res, next) { // admin
//   JournalUser.findById(req.params.id, function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });

