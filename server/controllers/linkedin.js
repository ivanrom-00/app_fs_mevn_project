const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true,
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));