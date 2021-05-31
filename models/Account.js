const mongoose = require('mongoose');
const { RequiredString, RequiredUniqueString, RequireConnectionType, UnRequiredString, RequiredBoolean } = require('../datas/MongoTypes');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
    email: RequiredUniqueString,
    username: RequiredString,
    password: UnRequiredString,
    connection: RequireConnectionType,
    token: UnRequiredString,
    confirmed: RequiredBoolean,
    resetPasswordToken: UnRequiredString,
    resetPasswordExpires: {
        type: Date,
        required: false
    }
}, { collection : 'accounts' });

schema.methods.tokenize = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {expiresIn: (expirationDate.getTime() / 1000).toString()});
}

schema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000;
    this.save();
};

const model =  mongoose.model('Account', schema);

module.exports = model;
