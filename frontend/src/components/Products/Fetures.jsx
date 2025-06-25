import React from 'react';
import { HiShoppingBag, HiOutlineSupport, HiOutlineShieldCheck } from 'react-icons/hi';

const Features = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">

        {/* Feature 1 */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-4 bg-white rounded-full shadow">
            <HiShoppingBag className="text-3xl text-blue-500" />
          </div>
          <div>
            <h4 className="font-semibold">Free International Shipping</h4>
            <p className="text-gray-600 text-sm tracking-tight">On orders over ₹10,000</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-4 bg-white rounded-full shadow">
            <HiOutlineSupport className="text-3xl text-green-500" />
          </div>
          <div>
            <h4 className="font-semibold">24/7 Customer Support</h4>
            <p className="text-gray-600 text-sm tracking-tight">Here to help anytime</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-4 bg-white rounded-full shadow">
            <HiOutlineShieldCheck className="text-3xl text-purple-500" />
          </div>
          <div>
            <h4 className="font-semibold">Secure Payments</h4>
            <p className="text-gray-600 text-sm tracking-tight">Trusted & encrypted checkout</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
