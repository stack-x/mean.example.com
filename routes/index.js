var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'Jason'});
});

/* GET home page. */
router.get('/view', function(req, res, next) {
  res.render('view', { title: 'Express', name: 'Jason'});
});

module.exports = router;
