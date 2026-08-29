import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('karoli_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for API errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired/unauthorized
      localStorage.removeItem('karoli_token');
      localStorage.removeItem('karoli_user');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
