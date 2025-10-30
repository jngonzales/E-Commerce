import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear auth and redirect if we're on a protected route
      const currentPath = window.location.pathname;
      const publicPaths = ['/', '/products', '/about', '/contact', '/faq', '/privacy', '/terms'];
      const isPublicPath = publicPaths.includes(currentPath) || currentPath.startsWith('/products/');
      
      localStorage.removeItem('token');
      localStorage.removeItem('auth-storage');
      
      // Only redirect if we're on a protected page
      if (!isPublicPath && !window.location.pathname.includes('redirect-loop-prevention')) {
        // Use this flag to prevent infinite loops
        window.history.replaceState(null, '', '/?auth=required');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
