const mongoose = require('mongoose');
const { RequiredString, RequiredUniqueString, RequireConnectionType, UnRequiredString, RequiredBoolean } = require('../datas/MongoTypes');

const schema = new mongoose.Schema({
    email: RequiredUniqueString,
    username: RequiredString,
    password: UnRequiredString,
    connection: RequireConnectionType,
    token: UnRequiredString,
    confirmed: RequiredBoolean,
    resetPasswordToken: UnRequiredString,
    resetPasswordExpires: { type: Date, required: false }
}, { collection : 'accounts' });

const model =  mongoose.model('Shop', schema);

module.exports = model;
