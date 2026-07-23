import axios from 'axios';

const API_URL = import.meta.env.PROD ? '/api' : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Attach token and set content type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Only set JSON content-type for non-FormData requests
  // FormData needs the browser to auto-set multipart/form-data with boundary
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Handle 401 responses (skip auto-redirect for login endpoint)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Don't redirect for login failures — those are expected "bad credentials" responses
      const isLoginRequest = err.config?.url?.includes('/auth/login');
      if (!isLoginRequest) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;