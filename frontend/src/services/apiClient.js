import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default apiClient;