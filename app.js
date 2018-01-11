var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var apiUsers = require('./routes/api/users');

var app = express();

var User = require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(require('express-session')({
  secret:'.?Qn28B>s|A{Vz~(w;hX;8v3Us$\H;[)|8(KH(HUNaW<*;:AI@h{`&pA~o|&uAj',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
  done(null, {
    id: user._id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name
  });
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

mongoose.connect('mongodb://localhost/bootcamp');

//Create the session
app.use(function(req, res, next){
  var userSession='';
  if(req.isAuthenticated()){
    userSession = req.session.passport.user;
  }
  next();
});

app.use(function(req,res,next){

  let whitelist = [
    '/',
    '/public',
    '/users/login',
    '/users/register'
  ];

  if(whitelist.indexOf(req.url) !== -1){
    return next();
  }

  //Allow access to blog posts
  var postView = '/posts/view/';
  if(req.url.substring(0, postView.length)===postView){
    return next();
  }

  if(req.isAuthenticated()){
    return next();
  }

  return res.redirect('/');
});

app.use('/', index);
app.use('/users', users);
app.use('/api/users', apiUsers);

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
  res.render('error');
});

module.exports = app;
