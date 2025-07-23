import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Header() {
  const { getTotalItems } = useCart();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('jhupto-user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jhupto-user');
    setUser(null);
    setShowUserMenu(false);
    alert('Logged out successfully!');
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 rounded-b-lg">
      <Link to="/" className="text-3xl font-bold text-primary mb-4 md:mb-0 hover:text-orange-600 transition-colors">
        JHUPTO
      </Link>

      <nav className="w-full md:w-auto">
        <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-lg items-center">
          <li><Link to="/" className="text-gray-700 hover:text-primary">Home</Link></li>
          <li><Link to="/recipe-suggester" className="text-gray-700 hover:text-primary">Recipes</Link></li>
          <li><Link to="/group-purchase" className="text-gray-700 hover:text-primary">Group Buy</Link></li>
          <li><Link to="/location" className="text-gray-700 hover:text-primary">Location</Link></li>
          <li><Link to="/feedback" className="text-gray-700 hover:text-primary">Feedback</Link></li>

          {user ? (
            <li className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 bg-orange-100 hover:bg-orange-200 rounded-full px-3 py-2"
              >
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {getUserInitials(user.name)}
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.phone && <p className="text-sm text-gray-600">{user.phone}</p>}
                  </div>

                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                    <Link to="/addresses" className="block px-4 py-2 text-sm hover:bg-gray-100">Saved Addresses</Link>
                    <div className="border-t my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all"
              >
                Login / Sign Up
              </Link>
            </li>
          )}

          <li>
            <Link to="/cart" className="relative text-gray-700 hover:text-primary">
              <div className="relative p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
