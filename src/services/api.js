import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-delivery.herokuapp.com', // 'http://10.0.0.120:3005',
});

export default api;
