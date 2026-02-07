import axios from 'axios';

const API_BASE_URL = 'https://blood-donor-app-production-ab11.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication Helpers
export const authService = {
  getToken: () => localStorage.getItem('authToken'),

  setAuthData: (data) => {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userData', JSON.stringify(data));
  },

  clearAuthData: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAdmin'); // Keep for compatibility with existing guards
  },

  getUserData: () => {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  }
};

// Request interceptor - add JWT token
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle unauthorized/expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.clearAuthData();
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

// Donor Services
export const donorService = {
  loginWithOtp: (credentials) =>
    api.post('/donors/login-otp', credentials),

  initiateRegistration: (data) =>
    api.post('/donors/register/initiate', data),

  completeRegistration: (data, otp) =>
    api.post(`/donors/register/complete?otp=${otp}`, data),

  searchDonors: (criteria) =>
    api.post('/donors/search', criteria),

  getDonorById: (id) =>
    api.get(`/donors/${id}`),
};

// Admin Services
export const adminService = {
  login: (credentials) =>
    api.post('/admin/login', credentials),

  getAllDonors: () =>
    api.get('/admin/donors'),

  addDonor: (data) =>
    api.post('/admin/donors', data),

  updateDonor: (id, data) =>
    api.put(`/admin/donors/${id}`, data),

  deleteDonor: (id) =>
    api.delete(`/admin/donors/${id}`),

  updateDonorStatus: (id, status, monthsUnavailable) => {
    let url = `/admin/donors/${id}/status?status=${status}`;
    if (monthsUnavailable) {
      url += `&monthsUnavailable=${monthsUnavailable}`;
    }
    return api.put(url, {});
  },
};

export default api;
