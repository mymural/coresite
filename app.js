// mymural.org
// app.js

// Required dependencies 
const express = require('express');
const app = express();
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var User = require('./user/User');

// cookieSession config
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
}));

app.use(express.static(path.join(__dirname, 'public')));

// Database connection
var db = require('./db');
//var auth = require('./auth');

//require('./config/passport')(passport); // pass passport for configuration

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Set the page template engine
app.set('view engine', 'ejs');


// PASSPORT LOCAL AUTHENTICATION 
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Verifying User account');
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});


// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}

// Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/error', (req,res) => {
    res.render('error.ejs');
});

app.get('/success', (req, res) => {
    res.render('success.ejs');
});

var BriefController = require('./brief/BriefController');
var UserController = require('./user/UserController');

app.get('/', (req, res) => {
    res.render('homepage.ejs');
//    res.send('Running')
});

// User register
app.get('/register', (req, res) => {
    // Show the user register form
    res.render('register.ejs');
});

app.get('/signin', (req, res) => {
    res.render('signin.ejs');
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/user/profile',
                                   failureRedirect: '/error'}));
/*
app.post('/login', (req, res) => {
    console.log('Test login function');
    console.log('The Request Object: ' + req);
    console.log('Username: ' + req.body.username);
    User.find({ username: req.body.username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(req.body.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
});
*/

app.use('/brief', BriefController);
app.use('/user', UserController);


console.log("The following URLs are active: ");
console.log("http://localhost:3000/brief/ : Live");

module.exports = app;