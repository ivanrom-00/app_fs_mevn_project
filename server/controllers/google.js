const User = require('../models/User');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8081/login/google/callback",
    passReqToCallback: true
},
    (request, accessToken, refreshToken, profile, done) => {
        // Controlar login con Google
        console.log(profile.emails[0].value);
        // const google_email = profile.emails[0].value;
        // const user = User.findOne({ email: google_email });
        // if (!user) {
        //     const newUser = new User({
        //         name: profile.displayName,
        //         google_email,
        //         googleId: profile.id,
        //     });
        //     try {
        //         newUser.save();
        //     } catch (err) { }
        //     return done(null, user);
        // } else {
        //     return done(null, user);
        // }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});