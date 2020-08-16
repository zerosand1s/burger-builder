import axios from 'axios';

const ordersAxiosInstance = axios.create({
  baseURL: 'https://burger-builder-1f206.firebaseio.com/'
});

export default ordersAxiosInstance;
