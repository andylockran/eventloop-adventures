var createError = require('http-errors');
var express = require('express');
const compression = require('compression')
var expressQueue = require('express-queue');
const queueMw = expressQueue({ activeLimit: 1, queuedLimit: -1 });
const { underPressure } = require('express-under-pressure');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var eld = require('express-lag-detector')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// Use compression
app.use(compression())

// Checks and logs for lag detection
// app.use(eld())

// Implements a simple queue to stop nodeJS from trying to handle too many simultaneous connections
app.use(queueMw);

// Custom middleware for logging the queue length of new requests
const queueLength = function(req, res, next) {
  console.log(`queueLength: ${queueMw.queue.getLength()}`);
  next();
};
app.use(queueLength)

// UnderPressure configuration to return 503 if the eventLoop is delayed by more than a second.
underPressure(app, {
  maxEventLoopDelay: 100, // Maximum event loop delay in milliseconds
  // maxHeapUsedBytes: 200 * 1024 * 1024, // Maximum heap used in bytes
  // maxRssBytes: 300 * 1024 * 1024, // Maximum RSS memory used in bytes
  message: 'Server Under Pressure', // Custom response message
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
