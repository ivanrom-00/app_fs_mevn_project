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
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});