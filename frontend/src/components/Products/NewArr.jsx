import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/productService";

// Mock data as fallback
const mockNewArrivals = [
  {
    _id: "1",
    name: "Stylish Jacket",
    price: 800,
    images: [{ url: "https://picsum.photos/seed/8/300/300" }],
    isBestSeller: true,
  },
  {
    _id: "2",
    name: "Cool Shirt",
    price: 500,
    images: [{ url: "https://picsum.photos/seed/32/300/300" }],
  },
  {
    _id: "3",
    name: "Shirt",
    price: 500,
    images: [{ url: "https://picsum.photos/seed/10/300/300" }],
  },
  {
    _id: "4",
    name: "Cool Hoodie",
    price: 500,
    images: [{ url: "https://picsum.photos/seed/20/300/300" }],
  },
];

const NewArr = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getNewArrivals();
        if (data && data.length > 0) {
          setNewArrivals(data);
        } else {
          throw new Error('No products found');
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setError(error.message || "Failed to load products. Please try again.");
        // Fallback to mock data in development
        if (process.env.NODE_ENV === 'development') {
          setNewArrivals(mockNewArrivals);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-8 px-4 sm:py-12 sm:px-6">
        <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading new arrivals...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4 sm:py-12 sm:px-6">
        <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 sm:py-12 sm:px-6">
      <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
        {newArrivals.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="border rounded-md p-2 sm:p-4 hover:shadow-md transition relative"
          >
            {product.isBestSeller && (
              <img
                src="https://i.imgur.com/XVXPpHV.png"
                alt="Best Seller"
                className="absolute top-2 left-2 w-8 sm:w-12 h-8 sm:h-12 z-10"
              />
            )}
            <img
              src={product.images && product.images[0] ? product.images[0].url : 'https://picsum.photos/300/300'}
              alt={product.name}
              className="rounded mb-2 w-full h-auto aspect-square object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/300/300';
              }}
            />
            <h4 className="font-semibold text-sm sm:text-base truncate">{product.name}</h4>
            <p className="text-green-600 text-sm sm:text-base">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArr;
