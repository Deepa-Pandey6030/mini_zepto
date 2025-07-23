// src/pages/GroupPurchase.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext'; // For showing modal messages

function GroupPurchase() {
  const [budget, setBudget] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { showModal } = useCart();

  const handleGenerateSuggestions = (e) => {
    e.preventDefault();
    if (!budget || !groupSize) {
      showModal("Please enter both budget and group size.");
      return;
    }
    // This is a placeholder for complex group purchase logic.
    // In a real app, you'd fetch products, run algorithms to find optimal bundles
    // based on budget, group size, and possibly user preferences/past purchases.
    const dummySuggestions = [
      { id: 1, name: 'Family Meal Deal (Pizza + Drinks)', price: 35.00, savings: 5.00 },
      { id: 2, name: 'Office Snack Pack (Assorted Chips + Cookies)', price: 20.00, savings: 3.00 },
      { id: 3, name: 'Healthy Lunch Bundle (Salad + Wrap + Juice)', price: 28.00, savings: 4.00 },
    ];
    setSuggestions(dummySuggestions);
    showModal("Generating group purchase suggestions...");
  };

  const handleSelectBundle = (bundleName) => {
    showModal(`"${bundleName}" selected! (Not added to cart in this demo)`);
    // In a real app, you'd add these items to the cart or create a group order.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Group Purchases & Budgeting</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plan Your Group Order</h2>
        <form onSubmit={handleGenerateSuggestions} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
              Your Budget ($)
            </label>
            <input
              type="number"
              id="budget"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              placeholder="e.g., 50"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="groupSize" className="block text-gray-700 text-sm font-bold mb-2">
              Number of People
            </label>
            <input
              type="number"
              id="groupSize"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              placeholder="e.g., 4"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Generate Suggestions
            </button>
          </div>
        </form>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Suggested Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((bundle) => (
              <div key={bundle.id} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{bundle.name}</h3>
                <p className="text-gray-600 mb-2">Price: <span className="font-bold text-lg">${bundle.price.toFixed(2)}</span></p>
                {bundle.savings > 0 && (
                  <p className="text-green-600 text-sm font-medium">Save: ${bundle.savings.toFixed(2)}</p>
                )}
                <button
                  onClick={() => handleSelectBundle(bundle.name)}
                  className="mt-4 w-full bg-secondary hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Select Bundle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.length === 0 && budget && groupSize && (
        <p className="text-center text-gray-600 text-xl py-10">No bundles found for your criteria. Try adjusting your budget or group size.</p>
      )}
    </div>
  );
}

export default GroupPurchase;