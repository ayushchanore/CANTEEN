// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      localStorage.removeItem('userToken');
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  userSignup: (data) => api.post('/auth/user/signup', data),
  userLogin: (data) => api.post('/auth/user/login', data),
  adminSignup: (data) => api.post('/auth/admin/signup', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  getUserProfile: () => api.get('/auth/user/me'),
  getAdminProfile: () => api.get('/auth/admin/me'),
};

// Menu APIs
export const menuAPI = {
  getAllItems: (category) => api.get(`/menu${category ? `?category=${category}` : ''}`),
  getItem: (id) => api.get(`/menu/${id}`),
  createItem: (data) => api.post('/menu', data),
  updateItem: (id, data) => api.put(`/menu/${id}`, data),
  deleteItem: (id) => api.delete(`/menu/${id}`),
  getAllItemsAdmin: () => api.get('/menu/admin/all'),
};

// Order APIs
export const orderAPI = {
  getUserOrders: () => api.get('/orders/user'),
  getAllOrders: (status) => api.get(`/orders/admin/all${status ? `?status=${status}` : ''}`),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (data) => api.post('/orders', data),
  createCheckoutSession: (data) => api.post('/orders/create-checkout-session', data),
  completePayment: (data) => api.post('/orders/complete-payment', data),
  updateOrderStatus: (id, data) => api.put(`/orders/${id}/status`, data),
  cancelOrder: (id) => api.delete(`/orders/${id}`),
};

export default api;
