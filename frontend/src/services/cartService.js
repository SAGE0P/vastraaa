import axios from 'axios';
import api from '../config/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Cart service functions
export const cartService = {
  // Add item to cart
  addToCart: async (productData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      };

      // Ensure we have either userId or guestId
      if (!productData.userId && !productData.guestId) {
        const userId = localStorage.getItem('userId');
        let guestId = localStorage.getItem('guestId');
        
        if (userId) {
          productData.userId = userId;
        } else {
          if (!guestId) {
            guestId = 'guest-' + Date.now();
            localStorage.setItem('guestId', guestId);
          }
          productData.guestId = guestId;
        }
      }

      const response = await axios.post(api.cart.add, productData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },
  
  // Get user's cart
  getCart: async () => {
    try {
      const headers = getAuthHeader();
      const userId = localStorage.getItem('userId');
      let guestId = localStorage.getItem('guestId');
      
      // If no userId or guestId exists, create a guest ID
      if (!userId && !guestId) {
        guestId = 'guest-' + Date.now();
        localStorage.setItem('guestId', guestId);
      }
      
      const response = await axios.get(api.cart.get(userId, guestId), { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },
  
  // Update item quantity in cart
  updateCartItem: async (updateData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      };

      // Ensure we have either userId or guestId
      if (!updateData.userId && !updateData.guestId) {
        const userId = localStorage.getItem('userId');
        const guestId = localStorage.getItem('guestId');
        
        if (userId) {
          updateData.userId = userId;
        } else if (guestId) {
          updateData.guestId = guestId;
        }
      }

      const response = await axios.put(api.cart.update, updateData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },
  
  // Remove item from cart
  removeCartItem: async (itemData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      };

      // Ensure we have either userId or guestId
      if (!itemData.userId && !itemData.guestId) {
        const userId = localStorage.getItem('userId');
        const guestId = localStorage.getItem('guestId');
        
        if (userId) {
          itemData.userId = userId;
        } else if (guestId) {
          itemData.guestId = guestId;
        }
      }

      // For DELETE requests with a body, we need to use axios config object
      const response = await axios.delete(api.cart.remove, { 
        headers,
        data: itemData
      });
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },
};

export default cartService;