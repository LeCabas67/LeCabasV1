const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Account = require('@models/Account');
const send = require('@libs/email');
const {Data, Error} = require('@datas/ResponseTypes');
const ConnectionTypes = require('@datas/ConnectionTypes');

let signin = (email, password, done) => {
    Account.findOne({email: email, connection: ConnectionTypes.LOCAL}, (err, account) => {
        if (err)
            return done({code: 500, error: new Error(err)});
        else if (!account) {
            return done({code: 404, error: new Error('No account.')});
        } else if (!bcrypt.compareSync(password, account.password))
            return done({code: 401, error: new Error('Password is incorrect')});
        return done(null, account, new Data({ access_token: account.tokenize(account), token_type: "Bearer" }));
    });
}

let signup = async (req, email, password, done) => {
    Account.findOne({email: email, connection: ConnectionTypes.LOCAL}, async (err, user) => {
        if (err)
            return done({code: 500, error: new Error(err)});
        else if (user)
            return done({code: 400, error: 'Account already existing with this email'});
        const account = await Account.create({
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email,
            confirmed: false,
            username: req.body.username,
            connection: ConnectionTypes.LOCAL
        });
        return done(null, account, new Data({ access_token: account.tokenize(account), token_type: "Bearer" }));
    });
}

module.exports = { signin, signup };
