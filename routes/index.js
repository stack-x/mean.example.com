var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello World', name: 'Jason'});
});

//crash the server for pm2 testing
router.get('/exit', function(req, res, next){
    process.exit(1);
});


module.exports = router;
