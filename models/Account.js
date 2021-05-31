const mongoose = require('mongoose');
const { createModelOptions, ObjectId } = require('../datas/MongoTypes');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
    email: createModelOptions(String, true, true),
    username: createModelOptions(String, true),
    password: createModelOptions(String),
    connection: { type: String, enum : ['LOCAL','FACEBOOK', 'GMAIL'], default: 'LOCAL' },
    shops: createModelOptions([ObjectId], false, false, 'Shop'),
    token: createModelOptions(String),
    confirmed: createModelOptions(Boolean, true),
    resetPasswordToken: createModelOptions(String, false),
    resetPasswordExpires: createModelOptions(Date, false),
}, { collection : 'accounts' });

schema.methods.tokenize = function(account) {
    const today = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({id: account.id}, process.env.JWT_SECRET, {expiresIn: (expirationDate.getTime() / 1000).toString()});
}

schema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000;
    this.save();
};

const model =  mongoose.model('Account', schema);

module.exports = model;
