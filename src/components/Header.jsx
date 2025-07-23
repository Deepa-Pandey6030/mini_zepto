// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Header() {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 rounded-b-lg">
      <Link to="/" className="text-3xl font-bold text-primary mb-4 md:mb-0">
        JHUPTO
      </Link>

      <nav className="w-full md:w-auto">
        <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-lg">
          <li>
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Home
            </Link>
          </li>
          <li>
            <Link to="/recipe-suggester" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/group-purchase" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Group Buy
            </Link>
          </li>
          <li>
            <Link to="/location" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Location
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Feedback
            </Link>
          </li>
          {/* Removed the Ingredient Chat link here */}
          <li>
            <Link to="/login" className="text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              Login
            </Link>
          </li>
          <li>
            <Link to="/cart" className="relative text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;