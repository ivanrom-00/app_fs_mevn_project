const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configuración de la estretegia local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Coincidir email del usuario
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: "User nor found" });
        } else {
          // Coincidir password del usuario
          const match = await user.matchPassword(password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        }
      } catch (err) {

      }

    }
  )
);

passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);

  // try {
  //   User.findById(id, (err, user) => {
  //     done(err, user);
  //   });
  // } catch (err) {
  // }
});