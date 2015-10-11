// *** main dependencies *** //
var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var path = require('path');
// var config = require('../_config.js');
// var favicon = require('favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

// *** mongoose *** //
mongoose.connect(process.env.MONGO_URI); // , function(err, res) {
//   if(err) {
//     console.log('Error connecting to the database. ' + err);
//   } else {
//     console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
//   }
// });


// *** routes *** //
var journalUser = require('./routes/journalUser.js');
var journalEntry = require('./routes/journalEntry.js');
// var user = require('./routes/userAPI.js'); // mike's example not needed


// *** express instance *** //
var app = express();

// *** static directory *** //
app.set('views', path.join(__dirname, 'views')); // doesn't this


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat', // never use keyboard cat, should be some crazy number
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/public')));

app.engine('html', require('ejs').renderFile); // doesn't have this
app.set('view engine', 'html'); // or this


// *** main routes *** //
app.use('/api/v1/', journalUser);
app.use('/', function(req,res) {
  res.sendFile(path.join(__dirname, '../client/public/views', 'layout.html'));
});
// app.use('/usernotes/', userNoteRoutes);
// app.use('/users/', userRoutes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// // *** error handlers *** //

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500).json({status: 'Error!'});
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500).json({status: 'Error!'});
// });


module.exports = app;