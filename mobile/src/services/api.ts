import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.106:5147/api',
});

export default api;