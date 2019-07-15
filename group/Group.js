// mymural.org
// Group.js
// This is the data model for the Group, a community / residents group

const crypto = require('crypto');

var mongoose = require('mongoose');
var GroupSchema = new mongoose.Schema({
    groupname: { type: String, unique: true },
    postcode: String
});

mongoose.model('Group', GroupSchema);

module.exports = mongoose.model('Group');