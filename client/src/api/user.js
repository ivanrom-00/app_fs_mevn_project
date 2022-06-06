import axios from 'axios';
const url = '/api/user';

export default class API {
    // Cerrar sesión
    static async logout() {
        const res = await axios.get(url+'/logout');
        return res.data;
    }
}