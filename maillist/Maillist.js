// mymural.org
// Maillist.js
// This is the data model for the brief document 

var mongoose = require('mongoose');
var MaillistSchema = new mongoose.Schema({
    brief_id: String,
    name: String,
    email_address: String
});
mongoose.model('Maillist', MaillistSchema);

module.exports = mongoose.model('Maillist');