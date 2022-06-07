const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // User.findById(id, (err, user) => {
    //     done(err, user);
    // });
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
        return done(null, profile);
        // const email = profile.emails[0].value;
        // User.findOne({ email: email }, (err, user) => {
        //     if (!user) {
        //         const newUser = new User({
        //             nombre: profile.displayName,
        //             email,
        //             googleId: profile.id,
        //         });
        //         newUser.save((error) => {
        //             if (error) {
        //                 //controlar el error
        //             }
        //             return done(null, user);
        //         });
        //     } else {
        //         return done(null, user);
        //     }
        //     return true;
        // });
    }
));