// mymural.org
// Artist.js
// This is the data model for the Artist, this is specific information for a user as an artist

const crypto = require('crypto');

var mongoose = require('mongoose');
var ArtistSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    website: String,
    contact_email: String,
    postcode: String,
    verified: Boolean
});

mongoose.model('Artist', ArtistSchema);

module.exports = mongoose.model('Artist');