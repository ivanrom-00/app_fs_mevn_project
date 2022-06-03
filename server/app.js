// imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// conexión a la BD
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(err => console.log(err));

// routes prefix
app.use('/api/post', require('./routes/routes'));

// start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));