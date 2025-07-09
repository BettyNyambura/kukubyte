import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/apis';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = (userId) => api.get(`/dashboard/stats/${userId}`);
export const getUserProfile = () => api.get('/user/profile');

export default api;