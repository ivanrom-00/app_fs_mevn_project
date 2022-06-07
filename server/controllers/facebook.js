const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));