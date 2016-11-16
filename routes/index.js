var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Assignment2',
  message:'mongodb'
  });
});
/* GET trending page. */
router.get('/trending', function(req, res, next) {
  res.render('trending', {
    title: 'Trending',
    aboutInfo: 'someInfo'
  });
});



module.exports = router;
