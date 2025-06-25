import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const ConfirmPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-8">
      <CheckCircleIcon className="w-16 h-16 text-green-600 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been successfully placed. A confirmation email has been sent to you.
      </p>

      <Link
        to="/"
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ConfirmPage;
