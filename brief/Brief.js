// mymural.org
// Brief.js
// This is the data model for the brief document 


// A brief is tied to a location and a user
// The relationship of the user with the location could be flexible
// So we wont tie the user to location yet.

var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
    user_id: String,
    comment: String
});

var InterestSchema = new mongoose.Schema({
    user_id: String,
    comment: String
});

var QuestionsSchema = new mongoose.Schema({
    user_id: String,
    question: String,
    answer: String,
    responder_id: String
});

var BriefSchema = new mongoose.Schema({
    title: String,
    description: String, 
    creator_id: String,
    group_id: String,
    postcode: String,
    height: Number,
    location: String,
    comments: [CommentsSchema],
    interest: [InterestSchema],
    questions: [QuestionsSchema],
    status: String 
});

mongoose.model('Brief', BriefSchema);

module.exports = mongoose.model('Brief');