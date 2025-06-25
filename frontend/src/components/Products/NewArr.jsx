import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        // Import and use the productService
        const { productService } = await import('../../services/productService');
        const data = await productService.getNewArrivals();
        setNewArrivals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setError("Failed to load new arrivals.");
        setLoading(false);
        // Fallback to mock data
        setNewArrivals(mockNewArrivals);
      }
    };
    
    fetchNewArrivals();
  }, []);
  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
      
      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading new arrivals...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {/* Products Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="border rounded-md p-4 hover:shadow-md transition relative"
            >
              {product.isBestSeller && (
                <img
                  src="https://i.imgur.com/XVXPpHV.png"
                  alt="Best Seller"
                  className="absolute top-2 left-2 w-12 h-12 z-10"
                />
              )}
              <img
                src={product.images && product.images[0] ? product.images[0].url : 'https://picsum.photos/300/300'}
                alt={product.name}
                className="rounded mb-2 w-full h-auto"
              />
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-green-600">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewArr;
