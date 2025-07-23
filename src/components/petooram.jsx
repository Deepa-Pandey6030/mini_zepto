import React, { useState } from 'react';
import IngredientInfoChat from '../pages/IngredientInfoChat'; // Make sure this exists

function Petooram() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      {/* Floating Petooram Button */}
      <div
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 to-indigo-700 text-white
                   p-4 rounded-full shadow-xl flex flex-col items-center justify-center space-y-1
                   transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-2
                   cursor-pointer border-4 border-white ring-2 ring-purple-300 "
        onClick={toggleChat}
      >
        {/* Image */}
        <img
          src="/petooram.jpg"
          alt="Petooram"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-md
                     transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/64x64/CCCCCC/000000?text=Petooram';
          }}
        />

        {/* Label */}
        <p className="font-bold text-xs md:text-sm text-center drop-shadow-lg group-hover:text-yellow-200 transition-colors">
          Petooram
        </p>

        {/* Chat Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white opacity-80 group-hover:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
          onClick={toggleChat}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md h-[70vh] md:h-[65vh]
                       flex flex-col overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={toggleChat}
              className="absolute top-3 right-4 text-3xl text-gray-400 hover:text-black transition-colors"
            >
              &times;
            </button>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <IngredientInfoChat />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Petooram;
