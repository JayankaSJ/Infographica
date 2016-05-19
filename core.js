var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var partials = require('./routes/partials');
var data = require('./routes/data');

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/infographica");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
   type:'application/x-www-form-urlencoding',
   extended: true,
   limit: '1mb'
  }));
app.use(bodyParser.json({
  type:'application/json',
  limit: '5mb'
}));
app.use(bodyParser.text({
    type : 'plain/text', 
    limit: '5mb'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/partials', partials);
app.use('/data', data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
