import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-center md:text-left">
          
          {/* Shop Links */}
          <section className="w-full md:w-1/3">
            <h4 className="text-gray-800 font-semibold mb-2">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Mens Top</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Womens Top</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Mens Bottoms</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Women Bottoms</Link></li>
            </ul>
          </section>

          {/* Support Links */}
          <section className="w-full md:w-1/3">
            <h4 className="text-gray-800 font-semibold mb-2">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">About us</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Contact us</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">FAQs</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900">Features</Link></li>
            </ul>
          </section>

          {/* Newsletter */}
          <section className="w-full md:w-1/3">
            <h4 className="text-gray-800 font-semibold mb-2">Subscribe to Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">
              Be the first to hear about our products, exclusive events, and online offers.
            </p>
            <form className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-grow p-2 text-sm border border-gray-400 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-black text-white px-4 py-2 text-sm font-semibold rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-gray-800 transition-all">
                Subscribe
              </button>
            </form>
          </section>
        </div>

        {/* Bottom text */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Vastraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
