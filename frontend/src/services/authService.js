import axios from 'axios';
import api from '../config/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authentication service functions
export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(api.auth.register, userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // If registration is successful, store user data and token
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.user._id);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post(api.auth.login, credentials, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // If login is successful, store user data and token
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.user._id);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Get user profile
  getProfile: async () => {
    try {
      const headers = getAuthHeader();
      const response = await axios.get(api.auth.profile, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;