// mymural.org
// BriefController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

var Brief = require('./Brief');

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
    res.sendStatus(200);
});

// Check the server and URLs are running
router.get('/test', isUserAuthenticated, (req, res) => {
    res.send("Running at /brief/test");
});

// GET
// /create -
// RETURN: HTML Form for creating a new brief 
router.get('/create', (req, res) => {
    res.render('brief/form.ejs');
})

// GET
// /view/:ID
router.get('/view/:id', (req, res) => {
    Brief.findById(req.params.id, (err, brief) => {
        if (err) return res.status(500).send("Problem retrieving that document");
        res.render('brief/brief_profile.ejs', {brief: brief, user: req.user});
    });
});

// GET 
// /list
router.get('/list', (req, res) => {
    // List all briefs
    Brief.find({}, (err, briefs) => {
        if (err) return res.status(500).send("Problem getting list of briefs");
        res.render('brief/list.ejs', {briefs: briefs});
    });
});

// GET 
// Return a JSON list of active briefs for display on pages
router.get('/jsonlist', (req, res) => {
    // List all briefs
    Brief.find({}, (err, briefs) => {
        if (err) return res.status(500).send("Problem getting list of briefs");
        res.render('brief/jsonlist.ejs', { briefs: briefs });
    });
});
// POST
// /create
router.post('/create', isUserAuthenticated, (req, res) => {
    Brief.create({
        title : req.body.title,
        description : req.body.description,
        height: req.body.height,
        postcode: req.body.postcode,
        creator_id: req.user._id
    }, 
    (err, brief) => {
        if (err) return res.status(500).send("There was a problem adding the document");
        res.status(200).json(brief);
    });
});

// POST
// /comment
router.post('/comment', isUserAuthenticated, (req, res) => {
    // Add a comment to a brief
    // Comments are in array inside the Brief document
    console.log(req.body);
    console.log('Brief ID: ' + req.body.id);


    // get the Brief document with ID
    Brief.findById(req.body.id, (err, brief) => {
        if (err) return res.status(500).send("Problem retrieving that document");
        //res.status(200).json(brief);

        // add the comment data
        brief.comments.push({ comment: req.body.comment });
        brief.save(function (err) {
            if (err) return handleError(err)
            console.log('Success!');
            res.status(200);
        });
    });
});

// POST
// /registerInterest
router.post('/registerInterest', isUserAuthenticated, (req, res) => {
    // To register interest the brief has to be live 
    // User has to be registered as an Artist

});

// POST
// /askQuestion
router.post('/askQuestion', (req, res) => {
    
});

// TODO
// Edit Brief
// Delete Brief


module.exports = router;