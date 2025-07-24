// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import CategoryCard from '../components/CategoryCard'; // Assuming these components exist
import ProductCard from '../components/ProductCard'; // Assuming these components exist
import { categories, products } from '../data/products'; // Assuming this data exists
//import VoiceAssistant from '../components/VoiceAssistant'; // Commented out as it's not provided
//import Spline from '@splinetool/react-spline'; // Assuming this is how SplineModel would be imported

function Home() {
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches 0
          return { hours: 2, minutes: 45, seconds: 30 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Offer data - Ensure categories match your products.js categories
  const offers = [
    {
      id: 1,
      emoji: '🍕',
      title: 'Buy 1 Get 1',
      subtitle: 'On Pizzas',
      description: 'Get a free pizza with every pizza purchase! Valid on all pizza varieties.',
      category: 'Ready to Eat', // Reverted to original specific category
      discount: 'BOGO',
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 2,
      emoji: '🥛',
      title: '30% OFF',
      subtitle: 'Dairy Products',
      description: 'Save 30% on all dairy items including milk, cheese, yogurt and more!',
      category: 'Dairy & Bakery', // Reverted to original specific category
      discount: '30%',
      color: 'from-blue-600 to-purple-700'
    },
    {
      id: 3,
      emoji: '📱',
      title: '₹500 OFF',
      subtitle: 'Electronics',
      description: 'Flat ₹500 discount on electronics above ₹2000. Limited time offer!',
      category: 'Electronics', // Reverted to original specific category
      discount: '₹500',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 4,
      emoji: '🍎',
      title: 'Fresh Deal',
      subtitle: 'Fruits & Veggies',
      description: 'Special prices on fresh fruits and vegetables. Farm to your door!',
      category: 'Fruits & Vegetables', // Reverted to original specific category
      discount: '25%',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
    // Auto-select the category for the offer and scroll
    handleCategorySelect(offer.category); // Use the unified handler
  };

  const handleShopNowClick = () => {
    setShowOfferModal(false); // Close modal if open
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle category selection and smooth scroll
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products based on selected category and veg/non-veg toggle
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesVegToggle = vegOnly ? product.type === 'veg' : true;
    return matchesCategory && matchesVegToggle;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-indigo-100 to-purple-200 font-inter">
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <div className="text-center mb-12 relative overflow-hidden py-12 animate-fade-in-up">
          {/* Delivery Man Animation (SVG) - Removed as per request */}
          {/* <div className="delivery-man-animation absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <rect x="30" y="100" width="140" height="40" rx="10" fill="#FF4500" className="shadow-lg" />
              <circle cx="50" cy="140" r="20" fill="#333" stroke="#222" strokeWidth="3" />
              <circle cx="150" cy="140" r="20" fill="#333" stroke="#222" strokeWidth="3" />
              <path d="M70 100 Q80 80 100 80 L110 80 Q120 80 130 100" stroke="#555" strokeWidth="5" fill="none" />
              <path d="M70 100 Q100 90 130 100 L130 110 Q100 120 70 110 Z" fill="#666" />
              <rect x="140" y="70" width="40" height="40" rx="5" fill="#8B4513" className="shadow-md" />
              <text x="160" y="95" fontSize="18" textAnchor="middle" fill="#FFF" fontWeight="bold">📦</text>
              <circle cx="90" cy="70" r="25" fill="#1E90FF" className="shadow-md" />
              <rect x="80" y="90" width="20" height="30" fill="#1E90FF" />
              <line x1="85" y1="105" x2="60" y2="120" stroke="#1E90FF" strokeWidth="5" />
              <line x1="95" y1="105" x2="120" y2="120" stroke="#1E90FF" strokeWidth="5" />
            </svg>
          </div> */}

          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent leading-tight animate-scale-in">
            Welcome to NIMBUS
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto
                        bg-white bg-opacity-90 p-4 rounded-xl shadow-lg
                        font-semibold drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              Your neighbourhood grocery store, delivered in minutes!
              <span className="font-extrabold text-blue-800"> Fresh produce</span>,
              <span className="font-extrabold text-purple-800"> daily essentials</span>, electronics and more.
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* 10 min delivery box */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-xl p-4 flex items-center space-x-2 border border-blue-100
                          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-300 cursor-pointer group">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-ping-pulse flex-shrink-0"></div>
              <span className="text-sm md:text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors">10 min delivery</span>
            </div>

            {/* Free delivery box */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-xl p-4 flex items-center space-x-2 border border-purple-100
                          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-300 cursor-pointer group">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
              <span className="text-sm md:text-base font-bold text-gray-800 group-hover:text-purple-700 transition-colors">Free delivery on ₹199+</span>
            </div>

            {/* Fresh & Quality Products box */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-lg shadow-xl p-4 flex items-center space-x-2 border border-orange-100
                          transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-orange-300 cursor-pointer group">
              <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm md:text-base font-bold text-gray-800 group-hover:text-orange-700 transition-colors">Fresh & Quality Products</span>
            </div>
          </div>
        </div>

        {/* Spline 3D Model Section - COMMENTED OUT */}
        {/* <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            ✨ Explore Our Featured Item in 3D!
          </h2>
          <SplineModel />
          <p className="text-center text-gray-600 mt-4 text-lg">
            (Interact with the 3D model above!)
          </p>
        </section> */}

        {/* Flash Sale & Offers Section */}
        <section className="mb-16 relative">
          {/* Background Glows - More dynamic and visually interesting */}
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-pulse z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob-pulse-delay z-0"></div>
          <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-pulse-alt z-0"></div>

          <div className="relative z-10 bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-900 rounded-2xl p-8 shadow-2xl overflow-hidden
                      animate-fade-in-up transform transition-transform duration-500 hover:scale-[1.01] hover:shadow-3xl" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-white">

              {/* Left Side - Flash Sale Details */}
              <div className="text-center lg:text-left space-y-4">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-5 py-2 rounded-full text-sm font-extrabold animate-pulse-fast shadow-lg transform hover:scale-110 transition-transform duration-200">
                  ⚡ FLASH SALE
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-snug bg-gradient-to-r from-yellow-200 to-white text-transparent bg-clip-text">
                  Limited Time Offers!
                </h2>
                <p className="text-lg opacity-90">
                  Enjoy up to <span className="font-bold text-yellow-300">50% off</span> on your favorite categories. Don't miss out!
                </p>
                <div className="inline-block px-6 py-3 rounded-xl bg-black bg-opacity-40 backdrop-blur-md border border-white border-opacity-30 shadow-inner text-yellow-300 font-mono text-2xl tracking-widest animate-pulse-slow-fade transform hover:scale-105 transition-transform duration-200">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <button
                  onClick={handleShopNowClick}
                  className="mt-4 bg-white text-purple-800 font-bold py-3 px-8 rounded-lg hover:bg-purple-200 hover:text-black
                             transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl
                             border-2 border-transparent hover:border-purple-500"
                >
                  🛍️ Shop Now
                </button>
              </div>

              {/* Right Side Offer Cards */}
              <div className="grid grid-cols-2 gap-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    onClick={() => handleOfferClick(offer)}
                    className={`relative rounded-xl p-4 text-white text-center bg-gradient-to-br ${offer.color} cursor-pointer
                               hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg group overflow-hidden
                               border-2 border-transparent hover:border-white hover:ring-2 hover:ring-yellow-300`}
                  >
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <div className="text-4xl mb-2 animate-bounce-subtle group-hover:animate-jiggle group-hover:scale-110 transition-transform duration-300">{offer.emoji}</div>
                    <div className="text-xl font-bold">{offer.title}</div>
                    <p className="text-sm opacity-90">{offer.subtitle}</p>
                    <span className="absolute top-2 right-2 bg-white text-black text-xs px-2 py-1 rounded-full font-bold">
                      {offer.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Offer Modal */}
        {showOfferModal && selectedOffer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in-up">
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedOffer.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedOffer.title}</h3>
                <p className="text-lg text-purple-700 font-semibold">{selectedOffer.subtitle}</p>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-center">{selectedOffer.description}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleShopNowClick}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions & Services */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">⚡ Quick Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors group-hover:scale-110">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">10 Min Delivery</h4>
              <p className="text-sm text-gray-700">Lightning fast delivery to your doorstep</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors group-hover:scale-110">
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Easy Payment</h4>
              <p className="text-sm text-gray-700">Multiple payment options available</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-teal-100">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors group-hover:scale-110">
                <span className="text-2xl">🎁</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Daily Rewards</h4>
              <p className="text-sm text-gray-700">Earn points on every order</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors group-hover:scale-110">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Quality Promise</h4>
              <p className="text-sm text-gray-700">Fresh products guaranteed</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                🛍️ Shop by Category
              </h2>
              <p className="text-gray-700">
                {categories.length + 1} categories • {products.length} total products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {/* "All" Category Card */}
            <div
              onClick={() => handleCategorySelect(null)}
              className={`group relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-2 border-4 ${
                selectedCategory === null ? 'border-orange-400 ring-4 ring-orange-200' : 'border-transparent'
              }`}
            >
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative p-4 md:p-6 h-32 md:h-40 flex flex-col items-center justify-center text-white">
                <div className="text-2xl md:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🌟</div>
                <h3 className="text-sm md:text-lg font-bold text-center">All Items</h3>
                <p className="text-xs opacity-90 mt-1">{products.length} products</p>
              </div>
            </div>

            {/* Dynamic Category Cards */}
            {categories.map((category, index) => {
              const categoryProducts = products.filter(p => p.category === category.name);
              const gradients = [
                'from-green-500 to-emerald-600',
                'from-blue-600 to-indigo-700',
                'from-yellow-400 to-orange-500',
                'from-purple-600 to-pink-700',
                'from-cyan-500 to-teal-600',
                'from-red-500 to-orange-600',
                'from-indigo-500 to-blue-600',
                'from-gray-500 to-gray-700'
              ];

              return (
                <div
                  key={category.name}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`group relative bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-2 border-4 ${
                    selectedCategory === category.name ? 'border-orange-400 ring-4 ring-orange-200' : 'border-transparent'
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative p-3 md:p-4 h-32 md:h-40 flex flex-col justify-end text-white">
                    <h3 className="text-sm md:text-lg font-bold text-center mb-1 drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-xs opacity-90 text-center">
                      {categoryProducts.length} items
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Products Section */}
        <section id="products-section" className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {selectedCategory ? (
                  <>
                    {selectedCategory === 'Ready to Eat' && '🍕'}
                    {selectedCategory === 'Fruits & Vegetables' && '🥗'}
                    {selectedCategory === 'Dairy & Bakery' && '🥛'}
                    {selectedCategory === 'Snacks & Beverages' && '🍿'}
                    {selectedCategory === 'Electronics' && '📱'}
                    {selectedCategory === 'Personal Care' && '🧴'}
                    {selectedCategory === 'Home & Kitchen' && '🍽️'}
                    {selectedCategory === 'Cleaning Supplies' && '🧽'}
                    {!['Ready to Eat', 'Fruits & Vegetables', 'Dairy & Bakery', 'Snacks & Beverages', 'Electronics', 'Personal Care', 'Home & Kitchen', 'Cleaning Supplies'].includes(selectedCategory) && '🛒'}
                    {' '}{selectedCategory}
                  </>
                ) : '🛒 All Products'}
              </h2>
              <p className="text-gray-700">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                {vegOnly && ' (Vegetarian only)'}
              </p>
            </div>

            {/* Enhanced Veg/Non-Veg Toggle */}
            <div className="flex items-center space-x-4">
              <label htmlFor="vegToggle" className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="vegToggle"
                    className="sr-only"
                    checked={vegOnly}
                    onChange={() => setVegOnly(!vegOnly)}
                  />
                  <div
                    className={`block w-14 md:w-16 h-7 md:h-8 rounded-full transition-all duration-300 ease-in-out shadow-inner ${
                      vegOnly ? 'bg-gradient-to-r from-green-500 to-teal-600' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-5 md:w-6 h-5 md:h-6 rounded-full transition-transform duration-300 ease-in-out shadow-md ${
                      vegOnly ? 'transform translate-x-7 md:translate-x-8' : 'transform translate-x-0'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {vegOnly ? '🌱' : '🍽️'}
                    </div>
                  </div>
                </div>
                <div className="ml-3 text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                  <span className="hidden sm:inline">Veg</span>
                </div>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                {vegOnly && selectedCategory
                  ? `No vegetarian items found in ${selectedCategory}`
                  : vegOnly
                  ? 'No vegetarian items found'
                  : selectedCategory
                  ? `No items found in ${selectedCategory}`
                  : 'No products match your criteria'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setVegOnly(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <>
              {/* Featured Products for Pizza/Ready to Eat */}
              {selectedCategory === 'Ready to Eat' && (
                <div className="mb-8 bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl p-6 text-white"> {/* Slightly darker red/orange */}
                  <h3 className="text-2xl font-bold mb-2">🍕 Hot & Fresh Ready to Eat!</h3>
                  <p className="text-lg opacity-90">Delicious pizzas, burgers, and more delivered hot to your door</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="transform hover:scale-105 transition-all duration-200 hover:z-10 relative"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Popular Products Section */}
        {!selectedCategory && (
          <section className="mt-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔥 Popular Right Now</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.filter(p => ['Margherita Pizza', 'Pepperoni Pizza', 'Fresh Bananas', 'Bluetooth Headphones'].includes(p.name)).map((product) => (
                <div
                  key={`popular-${product.id}`}
                  className="transform hover:scale-105 transition-all duration-200 relative"
                >
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10"> {/* Darker red */}
                    HOT
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Section */}
        {filteredProducts.length > 0 && (
          <section className="mt-16 bg-gradient-to-r from-blue-800 to-purple-900 rounded-2xl p-6 md:p-8 text-center text-white"> {/* Deeper blue/purple gradient */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Order? 🚀</h3>
            <p className="text-base md:text-lg mb-6 opacity-90">
              Add items to your cart and get them delivered in just 10 minutes!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                <span className="font-semibold text-sm md:text-base">⚡ Lightning Fast</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                <span className="font-semibold text-sm md:text-base">🛡️ Quality Assured</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
                <span className="font-semibold text-sm md:text-base">💰 Best Prices</span>
              </div>
            </div>
          </section>
        )}

        {/* Quick Stats */}
        <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl shadow-md p-4 border border-blue-100"> {/* Added border */}
            <div className="text-2xl font-bold text-blue-600">{products.length}</div> {/* Blue text */}
            <div className="text-sm text-gray-700">Total Products</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100"> {/* Added border */}
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div> {/* Purple text */}
            <div className="text-sm text-gray-700">Categories</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-teal-100"> {/* Added border */}
            <div className="text-2xl font-bold text-teal-600">10</div> {/* Teal text */}
            <div className="text-sm text-gray-700">Min Delivery</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border border-orange-100"> {/* Added border */}
            <div className="text-2xl font-bold text-orange-600">24/7</div> {/* Orange text */}
            <div className="text-sm text-gray-700">Available</div>
          </div>
        </section>
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        /* Custom Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes pingPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.8; }
        }

        @keyframes blobPulse {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(10px, -10px); }
          66% { transform: scale(0.9) translate(-10px, 10px); }
          100% { transform: scale(1) translate(0, 0); }
        }

        @keyframes blobPulseDelay {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(0.9) translate(-10px, 10px); }
          66% { transform: scale(1.1) translate(10px, -10px); }
          100% { transform: scale(1) translate(0, 0); }
        }

        @keyframes blobPulseAlt {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(-10px, -10px); }
          66% { transform: scale(0.9) translate(10px, 10px); }
          100% { transform: scale(1) translate(0, 0); }
        }

        @keyframes pulseFast {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes pulseSlowFade {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-1px); }
        }

        @keyframes jiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
          75% { transform: rotate(-0.5deg); }
        }

        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }
        .animate-ping-pulse { animation: pingPulse 2s infinite; }
        .animate-blob-pulse { animation: blobPulse 10s infinite ease-in-out alternate; }
        .animate-blob-pulse-delay { animation: blobPulseDelay 10s infinite ease-in-out alternate-reverse; }
        .animate-blob-pulse-alt { animation: blobPulseAlt 12s infinite ease-in-out alternate; }
        .animate-pulse-fast { animation: pulseFast 1s infinite; }
        .animate-pulse-slow-fade { animation: pulseSlowFade 3s infinite; }
        .animate-bounce-subtle { animation: bounceSubtle 1.5s infinite; }
        .animate-jiggle { animation: jiggle 0.5s infinite; }
        `}
      </style>
    </div>
  );
}

export default Home;
