const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/twitter/callback",
    profileFields: ['id', 'displayName', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));