// API configuration file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api';

export default {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/user/login`,
    register: `${API_BASE_URL}/user/register`,
    profile: `${API_BASE_URL}/user/profile`,
  },
  // Product endpoints
  products: {
    getAll: `${API_BASE_URL}/products`,
    getById: (id) => `${API_BASE_URL}/products/${id}`,
    getBestSellers: `${API_BASE_URL}/products/BestSellers`,
    getNewArrivals: `${API_BASE_URL}/products/new-arrivals`,
  },
  // Cart endpoints
  cart: {
    add: `${API_BASE_URL}/cart`,
    get: (userId, guestId) => {
      if (userId) return `${API_BASE_URL}/cart?userId=${userId}`;
      if (guestId) return `${API_BASE_URL}/cart?guestId=${guestId}`;
      return `${API_BASE_URL}/cart`;
    },
    update: `${API_BASE_URL}/cart`,
    remove: `${API_BASE_URL}/cart`,
  },
};