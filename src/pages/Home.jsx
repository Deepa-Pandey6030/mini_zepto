// src/pages/Home.jsx
import React, { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import VoiceAssistant from '../components/VoiceAssistant'; // Import VoiceAssistant
import { categories, products } from '../data/products'; // Import data

function Home() {
  const [vegOnly, setVegOnly] = useState(false); // State for Veg/Non-Veg toggle
  const [selectedCategory, setSelectedCategory] = useState(null); // State for category filter

  // Filter products based on selected category and veg/non-veg toggle
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesVegToggle = vegOnly ? product.type === 'veg' : true;
    return matchesCategory && matchesVegToggle;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 leading-tight">
        Welcome to <span className="text-primary">JHUPTO</span>!
      </h1>

      {/* Voice Assistant Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Need a Hand? Use Voice!</h2>
        <VoiceAssistant />
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* "All" Category Card */}
          <div
            onClick={() => setSelectedCategory(null)}
            className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer transform hover:-translate-y-1 border-2 ${
              selectedCategory === null ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src="https://placehold.co/150x150/000000/FFFFFF?text=All"
              alt="All Categories"
              className="w-full h-36 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-gray-800">All</h3>
            </div>
          </div>
          {/* Dynamic Category Cards */}
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`border-2 ${selectedCategory === category.name ? 'border-primary' : 'border-transparent'}`}
            >
              <CategoryCard name={category.name} image={category.image} />
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h2>
          {/* Veg/Non-Veg Toggle */}
          <label htmlFor="vegToggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="vegToggle"
                className="sr-only"
                checked={vegOnly}
                onChange={() => setVegOnly(!vegOnly)}
              />
              <div
                className={`block w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
                  vegOnly ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                  vegOnly ? 'transform translate-x-6' : 'transform translate-x-0'
                }`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              Show Veg Only
            </div>
          </label>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10">No products found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;