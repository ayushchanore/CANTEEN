// src/components/MenuCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export const MenuCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    addToCart({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity,
    });
    toast.success(`${item.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <div className="card overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={item.image || 'https://via.placeholder.com/300x200?text=Food+Item'}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

        {/* Price and Prep Time */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary">{formatPrice(item.price)}</span>
          <span className="text-xs text-gray-500">⏱️ {item.preparationTime} mins</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center transition"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center border border-gray-300 rounded py-1"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center transition"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!item.isAvailable}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            item.isAvailable
              ? 'bg-primary text-white hover:bg-opacity-90 cursor-pointer'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          }`}
        >
          {item.isAvailable ? 'Add to Cart' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};
