// Use the environment variable from .env
const API_BASE_URL = import.meta.env.VITE_API_SERVER;

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error: ${response.status}`);
  }
  return response.json();
};

// Base fetch function with authorization header
const fetchWithAuth = (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
};

// User related API calls
export const userAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw { response: { data } };
    }
    return { data };
  },
  
  getAll: async () => {
    const response = await fetchWithAuth('/users');
    const data = await handleResponse(response);
    return { data };
  },
  
  create: async (userData) => {
    const response = await fetchWithAuth('/postusers', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },
  
  update: async (id, userData) => {
    const response = await fetchWithAuth(`/updateuser/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },
  
  delete: async (id) => {
    const response = await fetchWithAuth(`/deleteuser/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(response);
  }
};

// Export the main API object
export default {
  users: userAPI
};
