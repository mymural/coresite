// mymural.org
// User.js
// This is the data model for the User 
const crypto = require('crypto');

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    salt: String,
    postcode: String,
    group_id: String,
    resident_pc: Boolean,
    resident_member: Boolean,
    artist: Boolean,
    other: Boolean
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    //return this.hash === hash;
    if (hash === this.password) {
        return true;
    } else {
        return false;
    }
}

UserSchema.methods.updatePassword = function (password, newPassword) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');

    if (hash === this.password) {
        //return true;
        // Old password the same so can update.
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = crypto.pbkdf2Sync(newPassword, this.salt, 10000, 512, 'sha512').toString('hex');
    } else {
        // Original password does not match
        return false;
    }
}

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');