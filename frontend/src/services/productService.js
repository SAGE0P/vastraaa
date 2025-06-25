import axios from 'axios';
import api from '../config/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Get a single product by ID
  getProductById: async (id) => {
    try {
      const response = await axios.get(api.products.getById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },
  
  // Get best selling products
  getBestSellers: async () => {
    try {
      const response = await axios.get(api.products.getBestSellers);
      return response.data;
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },
  
  // Get new arrivals
  getNewArrivals: async () => {
    try {
      const response = await axios.get(api.products.getNewArrivals);
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },
};

export default productService;