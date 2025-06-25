import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';

const Checkout = () => {
  const navigate = useNavigate();

  // 👤 User form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // 🛒 Cart data from Zustand
  const cartItems = useCartStore(state => state.items);
  const shipping = 100; // Fixed shipping cost
  const subtotal = useCartStore(state => state.getTotalPrice());
  const totalAmount = subtotal + shipping;

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  // 💵 Payment
  const paypalRef = useRef(null);
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (!formSubmitted) return;

    const loadPayPalScript = () => {
      if (window.paypal) {
        renderPayPalButton();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD';
      script.async = true;
      script.onload = () => {
        renderPayPalButton();
        setIsLoading(false);
      };
      script.onerror = () => {
        setError("Failed to load PayPal script.");
        setIsLoading(false);
      };
      document.body.appendChild(script);
    };

    const renderPayPalButton = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: totalAmount.toFixed(2) } }],
            });
          },
          onApprove: async (data, actions) => {
            try {
              await actions.order.capture();
              setIsPaid(true);
              setPaymentMethod('paypal');
              setTimeout(() => navigate('/order-confirmation'), 1500); // redirect
            } catch (err) {
              setError("Failed to capture order.");
            }
          },
          onError: (err) => {
            console.error(err);
            setError("Payment error. Try again.");
          },
        })
        .render(paypalRef.current);
    };

    loadPayPalScript();
  }, [formSubmitted, totalAmount, navigate]);

  const handleCOD = () => {
    setIsPaid(true);
    setPaymentMethod('cod');
    setTimeout(() => navigate('/order-confirmation'), 1500);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-10 border">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>

      {!formSubmitted ? (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            className="w-full border p-2 rounded"
            rows={3}
            value={formData.address}
            onChange={handleChange}
          />

          {formError && <p className="text-red-500">{formError}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Continue to Payment
          </button>
        </form>
      ) : (
        <>
          {/* 👤 User Info */}
          <div className="mb-6 text-sm">
            <h3 className="text-lg font-semibold mb-2">Shipping Info</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}</p>
          </div>

          {/* 🧾 Order Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <ul className="mb-2 space-y-1 text-sm">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* 🔁 Payment Methods */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {isPaid ? (
            <div className="text-green-600 font-semibold text-center">
              ✅ Order placed via {paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'}!
            </div>
          ) : (
            <>
              {isLoading && !window.paypal && (
                <p className="text-center text-gray-500">Loading payment options...</p>
              )}
              <div ref={paypalRef} className="mb-4 flex justify-center" />
              <div className="text-center text-gray-500 mb-3">or</div>
              <button
                onClick={handleCOD}
                className="w-full border border-gray-400 py-2 rounded hover:bg-gray-100 text-center"
              >
                Cash on Delivery
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
