const express = require('express');
const router = express.Router();
const API = require('../controllers/posts');
const multer = require('multer');

// middleware de multer para actualizar la imagen
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image");

// rutas
router.get('/', API.getAllPosts);
router.get('/:id', API.getPostByID);
router.post('/', upload, API.createPost);
router.patch('/:id', upload, API.updatePost);
router.delete('/:id', API.deletePost);

module.exports = router;