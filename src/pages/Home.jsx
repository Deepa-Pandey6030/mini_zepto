// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard'; // Assuming these components exist
import ProductCard from '../components/ProductCard'; // Assuming these components exist
import { categories, products } from '../data/products'; // Assuming this data exists

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

  // Offer data
  const offers = [
    {
      id: 1,
      emoji: '🍕',
      title: 'Buy 1 Get 1',
      subtitle: 'On Pizzas',
      description: 'Get a free pizza with every pizza purchase! Valid on all pizza varieties.',
      category: 'Ready to Eat',
      discount: 'BOGO',
      color: 'from-red-400 to-orange-500' // Existing vibrant gradient
    },
    {
      id: 2,
      emoji: '🥛',
      title: '30% OFF',
      subtitle: 'Dairy Products',
      description: 'Save 30% on all dairy items including milk, cheese, yogurt and more!',
      category: 'Dairy & Bakery',
      discount: '30%',
      color: 'from-blue-600 to-purple-700' // New blue/purple gradient
    },
    {
      id: 3,
      emoji: '📱',
      title: '₹500 OFF',
      subtitle: 'Electronics',
      description: 'Flat ₹500 discount on electronics above ₹2000. Limited time offer!',
      category: 'Electronics',
      discount: '₹500',
      color: 'from-teal-500 to-cyan-600' // New teal/cyan gradient for freshness
    },
    {
      id: 4,
      emoji: '🍎',
      title: 'Fresh Deal',
      subtitle: 'Fruits & Veggies',
      description: 'Special prices on fresh fruits and vegetables. Farm to your door!',
      category: 'Fruits & Vegetables',
      discount: '25%',
      color: 'from-green-500 to-emerald-600' // Green for natural produce
    }
  ];

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
    // Auto-select the category for the offer
    setSelectedCategory(offer.category);
  };

  const handleShopNowClick = () => {
    // Scroll to products section
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter"> {/* Updated background gradient */}
      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent leading-tight"> {/* Updated text gradient */}
            Welcome to NIMBUS
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"> {/* Darker gray for better contrast */}
            Your neighbourhood grocery store, delivered in minutes! Fresh produce, daily essentials, electronics and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2 border border-blue-100"> {/* Added border */}
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-800">10 min delivery</span> {/* Darker text */}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2 border border-purple-100"> {/* Added border */}
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div> {/* Darker blue */}
              <span className="text-sm font-medium text-gray-800">Free delivery on ₹199+</span> {/* Darker text */}
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-2 border border-orange-100"> {/* Added border */}
              <div className="w-3 h-3 bg-red-500 rounded-full"></div> {/* Red for emphasis */}
              <span className="text-sm font-medium text-gray-800">Fresh & Quality Products</span> {/* Darker text */}
            </div>
          </div>
        </div>

        {/* Flash Sale & Offers Section */}
<section className="mb-16 relative">
  {/* Background Glow */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0"></div>
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping z-0"></div>

  <div className="relative z-10 bg-gradient-to-br from-purple-800 via-indigo-800 to-blue-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-white">
      
      {/* Left Side */}
      <div className="text-center lg:text-left space-y-4">
        <div className="inline-block bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold animate-bounce shadow-md">
          ⚡ FLASH SALE
        </div>
        <h2 className="text-4xl font-extrabold leading-snug bg-gradient-to-r from-yellow-200 to-white text-transparent bg-clip-text">
          Limited Time Offers!
        </h2>
        <p className="text-lg opacity-90">
          Enjoy up to 50% off on your favorite categories.
        </p>
        <div className="inline-block px-5 py-2 rounded-lg bg-black bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 shadow-inner text-yellow-300 font-mono text-xl tracking-widest animate-pulse">
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <button 
          onClick={handleShopNowClick}
          className="mt-4 bg-white text-purple-800 font-bold py-3 px-6 rounded-lg hover:bg-purple-200 hover:text-black transition-all duration-300 shadow-md transform hover:scale-105"
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
            className={`relative rounded-xl p-4 text-white text-center bg-gradient-to-br ${offer.color} cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg`}
          >
            <div className="text-4xl mb-2 animate-bounce">{offer.emoji}</div>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowOfferModal(false)}>
            <div 
              className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedOffer.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedOffer.title}</h3>
                <p className="text-lg text-purple-700 font-semibold">{selectedOffer.subtitle}</p> {/* Darker purple */}
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-6"> {/* New light blue/purple gradient */}
                <p className="text-gray-700 text-center">{selectedOffer.description}</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowOfferModal(false);
                    setSelectedCategory(selectedOffer.category);
                    const productsSection = document.getElementById('products-section');
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
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
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">⚡ Quick Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-blue-100"> {/* Added border */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors"> {/* Blue background */}
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">10 Min Delivery</h4>
              <p className="text-sm text-gray-700">Lightning fast delivery to your doorstep</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-purple-100"> {/* Added border */}
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors"> {/* Purple background */}
                <span className="text-2xl">💳</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Easy Payment</h4>
              <p className="text-sm text-gray-700">Multiple payment options available</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-teal-100"> {/* Added border */}
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors"> {/* Teal background */}
                <span className="text-2xl">🎁</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Daily Rewards</h4>
              <p className="text-sm text-gray-700">Earn points on every order</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-green-100"> {/* Added border */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors"> {/* Green background */}
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Quality Promise</h4>
              <p className="text-sm text-gray-700">Fresh products guaranteed</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                🛍️ Shop by Category
              </h2>
              <p className="text-gray-700"> {/* Darker text */}
                {categories.length + 1} categories • {products.length} total products
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {/* "All" Category Card */}
            <div
              onClick={() => setSelectedCategory(null)}
              className={`group relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-2 border-4 ${
                selectedCategory === null ? 'border-orange-400 ring-4 ring-orange-200' : 'border-transparent'
              }`}
            >
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative p-4 md:p-6 h-32 md:h-40 flex flex-col items-center justify-center text-white">
                <div className="text-2xl md:text-4xl mb-2">🌟</div>
                <h3 className="text-sm md:text-lg font-bold text-center">All Items</h3>
                <p className="text-xs opacity-90 mt-1">{products.length} products</p>
              </div>
            </div>

            {/* Dynamic Category Cards */}
            {categories.map((category, index) => {
              const categoryProducts = products.filter(p => p.category === category.name);
              // Updated gradients to include more blues and purples
              const gradients = [
                'from-green-500 to-emerald-600', // Green for fresh
                'from-blue-600 to-indigo-700',   // Deep blue/indigo
                'from-yellow-400 to-orange-500', // Existing warm
                'from-purple-600 to-pink-700',   // Deep purple/pink
                'from-cyan-500 to-teal-600',     // Bright cyan/teal
                'from-red-500 to-orange-600',    // Existing fiery
                'from-indigo-500 to-blue-600',   // Indigo/blue
                'from-gray-500 to-gray-700'      // Neutral darker gray
              ];
              
              return (
                <div
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
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
        <section id="products-section">
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
              <p className="text-gray-700"> {/* Darker text */}
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
                      vegOnly ? 'bg-gradient-to-r from-green-500 to-teal-600' : 'bg-gray-300' // Green/Teal for veg
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
                  <span className="hidden sm:inline">Show </span>Veg Only
                </div>
              </label>
              
              {/* Clear Filters Button */}
              {(selectedCategory || vegOnly) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setVegOnly(false);
                  }}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>Clear Filters</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
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
        `}
      </style>
    </div>
  );
}

export default Home;
