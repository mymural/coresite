// mymural.org
// UserController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
const crypto = require('crypto');

var User = require('./User');

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}

// Return 200 if server live but nothing else
router.get('/', function (req, res) {
    res.status(200);
});

router.post('/register', (req, res) => {
    // Add a user to the database
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex');
    User.create({
        username: req.body.username,
        password: hash,
        postcode: req.body.postcode,
        salt: salt
    }, 
    (err, user) => {
        if (err) {
            //return res.status(500).send("There was a problem adding the document" + err);
            req.flash('message', 'That email address has already registered. Please try again, or get in touch.')
            res.redirect('/register');
        } else {
            req.login(user, function (err) {
                if (err) {
                    console.log(err);
                }
                return res.redirect('/user/profile');
            });
        };
    });
});

router.get('/profile', isUserAuthenticated, (req, res) => {

    res.render('user/profile.ejs', {user: req.user});
});

module.exports = router;