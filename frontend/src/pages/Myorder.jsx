import React, { useEffect, useState } from 'react';

const Myorder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      const mockOrders = [
        {
          id: "1234",
          createdAt: new Date().toLocaleString(),
          shippingAddress: {
            city: "Mumbai",
            country: "India"
          },
          orderItems: [
            { name: "Red T-Shirt" },
            { name: "Black Hoodie" }
          ]
        },
        {
          id: "5678",
          createdAt: new Date().toLocaleString(),
          shippingAddress: {
            city: "Delhi",
            country: "India"
          },
          orderItems: [
            { name: "Blue Jeans" }
          ]
        }
      ];
      setOrders(mockOrders);
    }, 500); // Simulate 0.5s loading
  }, []);

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p className="text-gray-500">Loading your orders...</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border rounded-md p-4 bg-gray-50 shadow-sm">
            <div className="mb-2 text-sm text-gray-700">
              <strong>Order ID:</strong> {order.id}
            </div>
            <div className="mb-2 text-sm text-gray-700">
              <strong>Date:</strong> {order.createdAt}
            </div>
            <div className="mb-2 text-sm text-gray-700">
              <strong>Shipping:</strong> {order.shippingAddress.city}, {order.shippingAddress.country}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Items:</strong>
              <ul className="list-disc list-inside mt-1">
                {order.orderItems.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Myorder;
