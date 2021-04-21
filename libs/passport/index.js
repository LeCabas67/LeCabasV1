const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const Account = require('@models/Account');
const Functions = require('./functions');

passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}, Functions.signin));

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, Functions.signup));

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, (jwt_payload, done) => Account.findById(jwt_payload.id,
        (err, user) => done(err ? err : null, user ? user : null))));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => Account.findById(id, (err, user) => done(err, user)));

module.exports = passport;
