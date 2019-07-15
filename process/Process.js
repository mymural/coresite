// mymural.org
// Process.js
// This is the data model for the Process 


var mongoose = require('mongoose');

var ProcessSchema = new mongoose.Schema({
    title: String,
    stage: Number,
    description: String
});

mongoose.model('Process', ProcessSchema);

module.exports = mongoose.model('Process');