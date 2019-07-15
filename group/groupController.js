// mymural.org
// GroupController.js

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

var User = require('../user/User');
var Group = require('./Group');

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/signin');
    }
}

// Return 200 if server live but nothing else
router.get('/', (req, res) => {
    res.status(200);
});

router.post('/create', (req, res) => {
    // Create a new group 

});

router.post('/update', (req, res) => {
    // Update an existing group 

});

router.post('/delete', (req, res) => {
    // Delete an existing group
});