import axios from 'axios';
const url = '/api/post';

export default class API {
    // Obtener todos los posts
    static async getAllPosts() {
        const res = await axios.get(url);
        return res.data;
    }

    // Obtener un post por ID
    static async getPostByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }

    // Insertar un post
    static async addPost(post) {
        const res = await axios.post(url, post);
        return res.data;
    }

    // Actualizar un post
    static async updatePost(id, post) {
        const res = await axios.patch(`${url}/${id}`, post);
        return res.data;
    }

    // Eliminar un post
    static async deletePost(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}