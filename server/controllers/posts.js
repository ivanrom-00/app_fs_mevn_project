const Post = require('../models/Post');
const fs = require('fs');

module.exports = class API {
    // Obtener todos los posts
    static async getAllPosts(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.send(404).json({ message: err.message });
        }
    }

    // Obtener post por ID
    static async getPostByID(req, res) {
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // crer un post
    static async createPost(req, res) {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({ message: 'Post created succesfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // actualizar un post
    static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = '';
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image)
            } catch (err) {
                console.log(err);
            }
        } else {
            new_image = req.body.old_image;
        }
        
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: 'Post updated successfully!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // eliminar un post
    static async deletePost(req, res) {
        const id = req.params.id;

        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: 'Post deleted successfully!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}