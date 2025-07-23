// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Import useCart hook

function ProductCard({ product }) {
  const { addToCart } = useCart(); // Get addToCart function from context

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x150/CCCCCC/000000?text=No+Image'; }} // Fallback image
      />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
          {product.type && product.type !== 'n/a' && (
            <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
              product.type === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)} // Use addToCart from context
          className="mt-4 w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;