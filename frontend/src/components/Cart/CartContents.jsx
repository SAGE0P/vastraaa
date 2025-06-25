import React from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { FiPlus, FiMinus } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';

const CartContents = () => {
  const cartItems = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-lg text-gray-600">Your cart is empty</p>
        <p className="text-sm text-gray-400">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex items-center py-4 border-b border-gray-200">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(item.price)}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                  disabled={item.quantity <= 1}
                >
                  <FiMinus size={16} />
                </button>
                <span className="mx-2 text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <FiPlus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartContents;
