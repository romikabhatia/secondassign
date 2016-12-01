var express = require('express');
var router = express.Router();

// link account model
var Account = require('../models/account');
var passport= require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Assignment2',
  message:'mongodb',
    user: req.user
  });
});



/* GET register page */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST register page */
router.post('/register', function(req, res, next) {
  // use passport and the Account model to save the new user
  Account.register(new Account( { username: req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          console.log(err);
          res.render('error');
        }
        else {
          res.redirect('/login');
        }
      });
});

/* GET login page */
router.get('/login', function(req, res, next) {

  // get session messages if there are any
  var messages = req.session.messages || [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });

  // clear the messages out of the session
  req.session.messages = null;
});

/* POST login page */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dynamites',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});


/* GET trending page. */
router.get('/trending', function(req, res, next) {
  res.render('trending', {
    title: 'Trending',
    aboutInfo: 'someInfo'
  });
});
/* GET trending page. */
router.get('/sale', function(req, res, next) {
  res.render('sale', {
    title: 'Sale',
    aboutInfo: 'someInfo'
  });
});

// GET /facebook
router.get('/facebook', passport.authenticate('facebook'),
    function(req, res, next) {
    });

/* GET /facebook/callback */
router.get('/facebook', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {
  // show the games page
  res.redirect('/dynamites');
});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}), function(req, res, next) {

  // show the dynamites page
  res.redirect('/dynamites');
});

module.exports = router;
