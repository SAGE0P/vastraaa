import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import FilterSide from "../components/Products/FilterSide";
import SortOption from "../components/Products/SortOption";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortType, setSortType] = useState("new");
  const sidebarRef = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Import and use the productService
        const { productService } = await import('../services/productService');
        const data = await productService.getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
        
        // Fallback to mock data if API fails
        const mockProducts = [
          {
            _id: "1",
            name: "Red T-Shirt",
            price: 799,
            images: [{ url: "https://picsum.photos/id/237/400/400" }],
          },
          {
            _id: "2",
            name: "Black Hoodie",
            price: 1199,
            images: [{ url: "https://picsum.photos/id/238/400/400" }],
          },
          {
            _id: "3",
            name: "Blue Jeans",
            price: 999,
            images: [{ url: "https://picsum.photos/id/239/400/400" }],
          },
          {
            _id: "4",
            name: "White Sneakers",
            price: 1499,
            images: [{ url: "https://picsum.photos/id/240/400/400" }],
          },
          {
            _id: "5",
            name: "Green Jacket",
            price: 1899,
            images: [{ url: "https://picsum.photos/id/241/400/400" }],
          },
          {
            _id: "6",
            name: "Denim Shirt",
            price: 899,
            images: [{ url: "https://picsum.photos/id/242/400/400" }],
          },
        ];
        setProducts(mockProducts);
      }
    };
    
    fetchProducts();
  }, []);

  const getSortedProducts = () => {
    if (!products || products.length === 0) {
      return [];
    }
    
    if (sortType === "low") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortType === "high") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md md:hidden"
        >
          <FaFilter />
          Filter
        </button>
        <SortOption sortType={sortType} setSortType={setSortType} />
      </div>

      {/* Filter Sidebar (Mobile) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 md:hidden">
          <div
            ref={sidebarRef}
            className="absolute left-0 top-0 w-3/4 max-w-xs h-full bg-white p-4 shadow-lg"
          >
            <FilterSide />
          </div>
        </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600">Loading products...</p>
        </div>
      )}
      
      {error && (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {getSortedProducts().map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.images && product.images[0] ? product.images[0].url : 'https://picsum.photos/400/400'}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold capitalize">{product.name}</h2>
              <p className="text-gray-700 mt-1 font-medium">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
