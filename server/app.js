// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const serveStatic = require('serve-static');
require('./controllers/passport');

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

// autenticación con Google
// require('./controllers/google');
// app.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
// app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/');
// });

// ruta para current user
app.get('/api/current_user', async (req, res) => {
    if (req.user) {
        res.send({ current_user: req.user });
    }
});

// inicio del servidor
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));