import axios from 'axios';
import { getToken } from './token'
const api = axios.create({
    baseURL: 'http://192.168.0.108:5066/api',
    timeout: 15000,
});

api.interceptors.request.use(async (config) => {
    const token = await getToken();

    console.log('Token encontrado:', !!token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;