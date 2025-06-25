import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CartContents from './CartContents';
import useCartStore from '../../store/cartStore';
import { authService } from '../../services/authService';

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cartTotal = useCartStore(state => state.getTotalPrice());
  const itemCount = useCartStore(state => state.getCartCount());
  
  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleCheckoutClick = () => {
    if (itemCount === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!isAuthenticated) {
      toggleCartDrawer();
      navigate('/login', { state: { returnTo: '/checkout' } });
      return;
    }
    
    toggleCartDrawer();
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed top-0 right-0 w-1/2 sm:w-3/4 md:w-1/4 h-full bg-gray-50 shadow-lg transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Close button */}
      <div className="p-4 flex justify-end">
        <button aria-label="Close Cart" onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-500 hover:text-gray-900" />
        </button>
      </div>

      {/* Cart content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CartContents />
      </div>

      {/* Checkout Section */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-bold">₹{cartTotal}</span>
        </div>
        <button
          className="w-full bg-black text-gray-50 py-3 px-1.5 rounded-lg font-semibold hover:bg-gray-900"
          onClick={handleCheckoutClick}
          disabled={itemCount === 0}
        >
          {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
        </button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
          Shipping and taxes are calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
