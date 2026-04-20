// src/components/CartItem.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

export const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className="flex gap-3 sm:gap-4 items-center bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-gray-100 mb-3 hover:shadow-lg transition duration-300">

      {/* Image */}
      <img
        src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm sm:text-lg text-gray-800 truncate">{item.name}</h3>
        <p className="text-orange-500 font-semibold text-sm sm:text-base">{formatPrice(item.price)}</p>
        {/* Subtotal on mobile */}
        <p className="text-gray-500 text-xs sm:hidden">
          Total: <span className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
          className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition"
        >
          <FaMinus size={10} />
        </button>
        <span className="w-6 sm:w-8 text-center font-bold text-sm sm:text-base">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
          className="bg-orange-100 hover:bg-orange-200 text-orange-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition"
        >
          <FaPlus size={10} />
        </button>
      </div>

      {/* Subtotal on desktop */}
      <div className="hidden sm:block text-right flex-shrink-0 min-w-[70px]">
        <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.menuItemId)}
        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition flex-shrink-0"
      >
        <FaTrashAlt size={14} />
      </button>
    </div>
  );
};
