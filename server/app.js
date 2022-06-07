// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const serveStatic = require('serve-static');
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Controladores de login
require('./controllers/passport');
require('./controllers/google');
require('./controllers/facebook');
require('./controllers/twitter');
require('./controllers/linkedin');

// constantes
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
// app.use(cookieParser());
// app.use(serveStatic(__dirname + "/dist"));

// middlewares para sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// conexión a la BD
mongoose.connect(process.env.DB_URI_ONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log(err));

// rutas de la API
app.use('/api/post', require('./routes/posts.routes'));
app.use('/api/user', require('./routes/users.routes'));
app.use('/api/rating', require('./routes/ratings.routes'));

// método para comprobar el inicio de sesión con redes sociales
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// GOOGLE LOGIN ------------------------------------------------------------------------------------
app.get('/google/failed', (req, res) => res.send('We are sorry, there was an error during login.'));
app.get('/google/good', isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}! \nYou can close this tab now. And please refresh the app when you return.`);
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/failed' }),
    (req, res) => {
        res.redirect('/google/good');
    });
// GOOGLE LOGIN ------------------------------------------------------------------------------------

// FACEBOOK LOGIN ------------------------------------------------------------------------------------
app.get('/facebook/failed', (req, res) => res.send('We are sorry, there was an error during login.'));
app.get('/facebook/good', isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}! \nYou can close this tab now. And please refresh the app when you return.`);
});

app.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebook/failed' }),
    (req, res) => {
        res.redirect('/facebook/good');
    });
// FACEBOOK LOGIN ------------------------------------------------------------------------------------    

// TWITTER LOGIN ------------------------------------------------------------------------------------
app.get('/twitter/failed', (req, res) => res.send('We are sorry, there was an error during login.'));
app.get('/twitter/good', isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}! \nYou can close this tab now. And please refresh the app when you return.`);
});

app.get('/twitter', passport.authenticate('twitter', { scope: ['email'] }));
app.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/twitter/failed' }),
    (req, res) => {
        res.redirect('/twitter/good');
    });
// TWITTER LOGIN ------------------------------------------------------------------------------------  

// LINKEDIN LOGIN ------------------------------------------------------------------------------------
app.get('/linkedin/failed', (req, res) => res.send('We are sorry, there was an error during login.'));
app.get('/linkedin/good', isLoggedIn, (req, res) => {
    res.send(`Welcome, ${req.user.displayName}! \nYou can close this tab now. And please refresh the app when you return.`);
});

app.get('/linkedin', passport.authenticate('linkedin'));
app.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/linkedin/failed' }),
    (req, res) => {
        res.redirect('/linkedin/good');
    });
// LINKEDIN LOGIN ------------------------------------------------------------------------------------  

// Logout General
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
});

// ruta para current user
app.get('/api/current_user', async (req, res) => {
    try {
        if (!req.user.emails) {
            res.send({ current_user: req.user.email });
        } else {
            res.send({ current_user: req.user.emails[0].value });
        }
    } catch (err) {

    }
});

// inicio del servidor
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));