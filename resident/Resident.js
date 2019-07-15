// mymural.org
// Resident.js
// This is the data model for the Resident, this is specific information for a user as an resident

const crypto = require('crypto');

var mongoose = require('mongoose');
var ResidentSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    contact_email: String,
    postcode: String,
    verified: Boolean
});

mongoose.model('Resident', ResidentSchema);

module.exports = mongoose.model('Resident');