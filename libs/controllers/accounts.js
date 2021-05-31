const passport = require('@libs/passport');
const send = require('@libs/email');
const bcrypt = require('bcryptjs');
const Account = require('@models/Account');
const {Error} = require('@datas/ResponseTypes');

const signin = (req, res, next) => {
    let callback = passport.authenticate('signin', {session: false }, (err, user, info) => {
        if (err)
            return res.status(err.code).json(err.error);
        return res.status(!user ? 400 : 201).json(info)
    });
    return callback(req, res, next);
};

const signup = (req, res, next) => {
    let callback = passport.authenticate('signup', {session: false }, (err, user, info) => {
        if (err)
            return res.status(err.code).json(new Error(err.error));
        return res.status(!user ? 400 : 201).json(!user ? new Error("You already have an account with this email" ): info)
    });
    return callback(req, res, next);
};

const forgot = (req, res) => {
    if (req.body.email) {
        Account.findOne({email: req.body.email}, (err, account) => {
            if (!!account && !!account.password) {
                account.generatePasswordReset();
                const link = "http://" + req.headers.host + "/account/reset/" + account.resetPasswordToken;
                send(req.body.email, `<a href="${link}">Click for a new password</a>`);
                return res.status(204).send();
            } else
                return res.status(400).json(new Error("No Account with this email"));
        });
    } else
        return res.status(400).json(new Error("Email is missing"));
};

const reset = (req, res) => {
    Account.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
        .then((user) => {
            if (!user) return res.status(401).json(new Error('Password reset token is invalid or has expired.'));

            //Redirect user to form with the email address
            res.render('reset', {title: "Reset password", user: user});
        })
        .catch(err => res.status(500).json(new Error(err.message)));
};

const resetPassword = (req, res) => {
    Account.findOneAndUpdate({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}},
        {password: bcrypt.hashSync(req.body.password), resetPasswordToken: undefined, resetPasswordExpires: undefined},
        {useFindAndModify: false},
        (err, doc) => {
            if (!doc) return res.status(401).json(new Error('Password reset token is invalid or has expired.'));
            if (err) return res.status(500).json(new Error(err.message));
            return res.status(204).send();
        });
}

module.exports = { signin, signup, forgot, reset, resetPassword };
