import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext.jsx';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // ❤️ Import icons

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log(`${product.name} ${isLiked ? 'unliked' : 'liked'}!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col relative">
      {/* Like Button */}
      <button
        onClick={handleLikeClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white bg-opacity-80 backdrop-blur-sm
                   hover:bg-opacity-100 transition-all duration-200 shadow-md"
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        {isLiked ? (
          <AiFillHeart className="text-red-500 text-2xl transition-transform duration-300 scale-110" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-2xl hover:text-red-400 transition-transform duration-300" />
        )}
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/200x150/CCCCCC/000000?text=No+Image';
        }}
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
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
