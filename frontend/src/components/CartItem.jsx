// src/components/CartItem.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow border border-gray-200">
      {/* Image */}
      <img
        src={item.image || 'https://via.placeholder.com/100'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
        >
          −
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.menuItemId)}
        className="text-red-600 hover:text-red-800 ml-2"
      >
        🗑️
      </button>
    </div>
  );
};
