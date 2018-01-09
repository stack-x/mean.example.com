var express = require('express');
var router = express.Router();

var users = {
  a:{
    '_id':'1000',
    'name': 'Bob Smith',
    'email': 'bob@example.com'
  },
  b:{
    '_id':'1001',
    'name': 'Sally Smith',
    'email': 'sally@example.com'
  },
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.json(users);
});

/* GET home page. */
router.get('/view/:id', function(req, res, next) {
  res.setHeader("Content-Type", "application/json");

  let a = {
    '_id':'1000',
    'name': 'Bob Smith',
    'email': 'bob@example.com'
  }

  let b = {
    '_id':'1001',
    'name': 'Sally Smith',
    'email': 'sally@example.com'
  }

  res.json(req.params.id=="a"?a:b);
});

module.exports = router;
