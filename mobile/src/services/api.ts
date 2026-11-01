import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.106:5066/api',
    timeout: 15000,
});

export default api;