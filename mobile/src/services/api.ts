import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.105:5147/api',
    timeout: 15000,
});

export default api;