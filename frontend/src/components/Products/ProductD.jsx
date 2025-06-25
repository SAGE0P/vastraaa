import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import api from "../../config/api";
import useCartStore from '../../store/cartStore';

// Will be replaced with API data
const allProducts = [
  {
    _id: "1",
    name: "Stylish Jacket",
    price: 800,
    ogPrice: 1000,
    brand: "FashionKing",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Black"],
    isBestSeller: true,
    images: [{ url: "https://picsum.photos/seed/8/500/500" }],
  },
  {
    _id: "2",
    name: "Cool Shirt",
    price: 500,
    ogPrice: 700,
    brand: "StreetWear",
    sizes: ["M", "L"],
    colors: ["White", "Blue"],
    isBestSeller: false,
    images: [{ url: "https://picsum.photos/seed/32/500/500" }],
  },
  {
    _id: "3",
    name: "Shirt",
    price: 500,
    ogPrice: 700,
    brand: "ClassicWear",
    sizes: ["S", "M", "L"],
    colors: ["White", "Black"],
    isBestSeller: false,
    images: [{ url: "https://picsum.photos/seed/10/500/500" }],
  },
  {
    _id: "4",
    name: "Cool Hoodie",
    price: 500,
    ogPrice: 700,
    brand: "UrbanStyle",
    sizes: ["M", "L"],
    colors: ["Grey", "Black"],
    isBestSeller: false,
    images: [{ url: "https://picsum.photos/seed/20/500/500" }],
  },
];

const ProductD = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCartStore();
  
  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Import and use the productService
        const { productService } = await import('../../services/productService');
        const data = await productService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again.");
        setLoading(false);
        // Fallback to mock data if API fails
        setProduct(allProducts.find((item) => item._id === id));
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }
  
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  
  if (!product) {
    return <div className="text-center py-10 text-red-500">Product not found</div>;
  }

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => quantity > 1 && setQuantity((prev) => prev - 1);
  const totalPrice = product.price * quantity;

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    // Import and use the cartService
    const { cartService } = await import('../../services/cartService');
    const { authService } = await import('../../services/authService');
    
    const color = product.colors[0];
    const userId = authService.getCurrentUser()?._id;

    const payload = {
      productId: product._id,
      quantity,
      color,
      size: selectedSize,
      userId: userId || null,
      guestId: !userId ? 'guest-' + Date.now() : null // Generate a guest ID if not logged in
    };

    try {
      const res = await cartService.addToCart(payload);

      console.log("✅ Cart API response:", res);

      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url || 'https://picsum.photos/seed/8/500/500',
        size: selectedSize,
        quantity: quantity
      });

      toast.success(
        `Added ${quantity} x ${product.name} (Size ${selectedSize}) to cart`
      );
    } catch (error) {
      console.error("❌ Cart API error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 relative">
            {product.isBestSeller && (
              <img
                src="https://i.imgur.com/XVXPpHV.png"
                alt="Best Seller"
                className="absolute top-4 left-4 w-24 h-24 object-contain z-10"
              />
            )}
            <img
              src={product.images && product.images[0] ? product.images[0].url : 'https://picsum.photos/seed/8/500/500'}
              alt={product.name}
              className="w-full rounded-lg shadow"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 text-gray-800 flex items-center gap-2">
              {product.name}
              {product.isBestSeller && (
                <span className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
                  Best Seller
                </span>
              )}
            </h1>

            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand}
            </p>

            <div className="mb-4">
              <p className="text-gray-700 font-semibold mb-2">Select Size:</p>
              <div className="flex gap-2">
                {product.sizes && product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Colors:</span>{" "}
              {product.colors && product.colors.join(", ")}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </span>
              <span className="text-lg line-through text-gray-400">
                ₹{product.ogPrice}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-700 font-semibold">Quantity:</span>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-4 text-lg font-medium text-gray-700">
              Total: ₹{totalPrice}
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductD;