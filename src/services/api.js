import axios from 'axios';
import { AuthContext } from '@/context/AuthContext.jsx';

// Get API URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store to hold auth context
let authContextRef = null;

export const setAuthContext = (authContext) => {
  authContextRef = authContext;
};

// Interceptor untuk menambahkan token ke setiap request (SSR-safe)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor untuk handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - Token expired or invalid');
      
      // Clear localStorage (SSR-safe)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      
      // Clear auth context if available
      if (authContextRef?.clearAuth) {
        authContextRef.clearAuth();
      }
      
      // Redirect to login (SSR-safe)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
