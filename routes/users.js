var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/index', {title:'Hello World'});
});

router.get('/create', function(req, res, next) {
  res.render('users/create');
});

module.exports = router;
