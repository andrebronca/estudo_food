var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var hateoasLinker = require('./api/lib/hateoas');

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/mobills';

//mLab conexão
var mongoDB = 'mongodb://douglas:william@ds125195.mlab.com:25195/plus-control-api'
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var index = require('./api/routes/index.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname + '/api/', 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname + '/api/', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/api/', 'public')));

//lib para alterar res.json implementado hateoas
app.use(hateoasLinker);

//CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Api Router
app.use('/api/v1', index);

//api doc
app.use('/doc', express.static(path.join(__dirname + '/api/', 'public/apidoc')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'ERROR'});
});

module.exports = app;
