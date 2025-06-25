import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineUser as HiOutLineUser, HiBars3BottomRight } from 'react-icons/hi2';
import CartDrawer from '../Cart/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import useCartStore from '../../store/cartStore';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const cartCount = useCartStore(state => state.getCartCount()) || 0;

  const toggleCartDrawer = () => setDrawerOpen(prev => !prev);
  const toggleNavDrawer = () => setNavDrawerOpen(prev => !prev);

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
          vastraa
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link to="/men" className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wide transition-colors">
            men
          </Link>
          <Link to="/women" className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wide transition-colors">
            women
          </Link>
          <Link to="/top" className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wide transition-colors">
            top
          </Link>
          <Link to="/bottoms" className="text-gray-600 hover:text-black text-sm font-medium uppercase tracking-wide transition-colors">
            bottoms
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/profile" aria-label="Profile" className="hover:text-gray-600 transition-colors">
            <HiOutLineUser className="h-6 w-6" />
          </Link>

          <button
            aria-label="Shopping Bag"
            onClick={toggleCartDrawer}
            className="relative hover:text-gray-600 transition-colors">
            <HiOutlineShoppingBag className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          <button 
            aria-label="Menu" 
            onClick={toggleNavDrawer} 
            className="md:hidden hover:text-gray-600 transition-colors">
            <HiBars3BottomRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          navDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleNavDrawer}
      />
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={toggleNavDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Link
            to="/men"
            className="block py-2 text-gray-600 hover:text-black font-medium uppercase"
            onClick={toggleNavDrawer}
          >
            Men
          </Link>
          <Link
            to="/women"
            className="block py-2 text-gray-600 hover:text-black font-medium uppercase"
            onClick={toggleNavDrawer}
          >
            Women
          </Link>
          <Link
            to="/top"
            className="block py-2 text-gray-600 hover:text-black font-medium uppercase"
            onClick={toggleNavDrawer}
          >
            Top
          </Link>
          <Link
            to="/bottoms"
            className="block py-2 text-gray-600 hover:text-black font-medium uppercase"
            onClick={toggleNavDrawer}
          >
            Bottoms
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
