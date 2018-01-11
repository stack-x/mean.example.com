var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Jason'});
});

router.get('/view', function(req, res, next) {
  res.render('view', { title: 'Express', name: 'Jason'});
});

module.exports = router;
