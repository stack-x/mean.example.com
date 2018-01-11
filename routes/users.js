var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('users/index', {title:'User Management'});
});

router.get('/register', function(req, res, next) {
  res.render('users/register', {title:'Create an Account'});
});

router.get('/login', function(req, res){
  res.render('users/login');
});

router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/users');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;
