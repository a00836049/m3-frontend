import axios from 'axios';

// Use the environment variable from .env
const API_BASE_URL = import.meta.env.VITE_API_SERVER;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User related API calls
export const userAPI = {
  login: (credentials) => apiClient.post('/login', credentials),
  getAll: () => apiClient.get('/users'),
  create: (userData) => apiClient.post('/postusers', userData),
  update: (id, userData) => apiClient.put(`/updateuser/${id}`, userData),
  delete: (id) => apiClient.delete(`/deleteuser/${id}`),
};

export default {
  users: userAPI
};
