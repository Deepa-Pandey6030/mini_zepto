// src/components/CategoryCard.jsx
import React from 'react';

function CategoryCard({ name, image }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-1">
      <img
        src={image}
        alt={name}
        className="w-full h-36 object-cover rounded-t-xl"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/CCCCCC/000000?text=No+Image'; }} // Fallback image
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center text-gray-800">{name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;