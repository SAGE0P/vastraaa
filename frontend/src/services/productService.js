import axios from 'axios';
import api from '../config/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Axios instance with default config
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Server error occurred');
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      // Request setup error
      throw new Error('Failed to make request. Please try again.');
    }
  }
);

// Product service functions
export const productService = {
  // Get all products with optional filters
  getAllProducts: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const queryString = queryParams.toString();
      const url = queryString ? `${api.products.getAll}?${queryString}` : api.products.getAll;
      
      const response = await axiosInstance.get(url);
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Get a single product by ID
  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(api.products.getById(id));
      if (!response.data) {
        throw new Error('Product not found');
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  // Get best selling products
  getBestSellers: async () => {
    try {
      const response = await axiosInstance.get(api.products.getBestSellers);
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },
  
  // Get new arrivals
  getNewArrivals: async () => {
    try {
      const response = await axiosInstance.get(api.products.getNewArrivals);
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid response format from server');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },
};

export default productService;