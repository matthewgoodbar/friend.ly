const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { secretOrKey } = require('./keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (user) {
        bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
            if (err || !isMatch) done(null, false);
            else done(null, user);
        });
    } else {
        done(null, false);
    }
}));

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user = await User.findById(jwtPayload._id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch(err) {
        done(err);
    }
}));

exports.loginUser = async (user) => {
    const userInfo = {
        _id: user._id,
        username: user.username,
        email: user.email
    };
    const token = await jwt.sign(
        userInfo,
        secretOrKey,
        { expiresIn: 3600 }
    );
    return {
        user: userInfo,
        token
    };
};

exports.requireUser = passport.authenticate('jwt', { session: false });

exports.restoreUser = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) return next(err);
        if (user) req.user = user;
        next();
    })(req, res, next);
};