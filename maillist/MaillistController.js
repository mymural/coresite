// mymural.org
// MaillistController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

var Maillist = require('./Maillist');

// Return 200 if server live but nothing else
router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/subscribe', (res, req) => {
    // Add a Maillist object
    // Check if the combination of brief_id and email address already exists
    
})