var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var restaurantsRouter = require('./routes/restaurants');
var testtestRouter = require('./routes/testtest');
var delUser = require('./routes/users');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/* app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET, POST, DELETE, OPTIONS, PUT, PATCH',
}));  */
/* app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', "*");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); */

require('./routes/user.routes')(app);
require('./routes/restaurant.routes')(app);
require('./routes/offer.routes')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
// app.use('/pom', pomRouter);
app.use('/testtest', testtestRouter);
//  app.use('/users/deleteUser/(:id)', delUser);
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

app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/users/login']}));

app.listen(5000, null, function(){
  console.log("server radi");
})

module.exports = app;
