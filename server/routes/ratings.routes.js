const express = require('express');
const router = express.Router();
const API = require('../controllers/ratings');

// rutas
router.get('/', API.getAllRatings);
router.put('/', API.createUpdateRating);

module.exports = router;