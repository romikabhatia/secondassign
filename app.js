var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var dynamites = require('./routes/dynamites');


var app = express();
// use mongoose to connect to the mongo
var mongoose = require('mongoose');
var config = require('./config/globalvars');
mongoose.connect(config.db);

// passport configuration for authentication
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;


// enable the app to use these passport classes
app.use(flash());

// configure sessions
app.use(session( {
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// connect passport to the Account model to talk to mongodb
var Account = require('./models/account');
passport.use(Account.createStrategy());



// github auth configuration
var githubStrategy = require('passport-github').Strategy;

passport.use(new githubStrategy({
      clientID: config.ids.github.clientID,
      clientSecret: config.ids.github.clientSecret,
      callbackURL: config.ids.github.callbackURL
    },
    function(accessToken, refreshToken, profile, cb)
    {
      // check if mongodb already has this user
      Account.findOne({ oauthID: profile.id }, function(err, user) {
        if (err) {
          console.log(err);
        }
        else {
          if (user !== null) {
            // this user has already registered via github
            cb(null, user);
          }
          else {
            // user is new to us, so save them to accounts collection
            user = new Account({
              oauthID: profile.id,
              username: profile.username,
              created: Date.now()
            });

            user.save(function(err) {
              if (err) {
                console.log(err);
              }
              else {
                cb(null, user);
              }
            });
          }
        }
      });
    }));



// manage sessions through the db
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dynamites',dynamites);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;