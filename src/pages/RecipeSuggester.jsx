// src/pages/RecipeSuggester.jsx
import React, { useState } from 'react';
import { recipes } from '../data/recipes'; // Import mock recipes data
import { useCart } from '../contexts/CartContext'; // For showing modal messages

function RecipeSuggester() {
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [vegOnly, setVegOnly] = useState(false); // State for Veg/Non-Veg toggle
  const { showModal } = useCart();

  const handleSuggestRecipes = () => {
    const userIngredients = availableIngredients.toLowerCase().split(',').map(item => item.trim()).filter(item => item !== '');

    const filteredRecipes = recipes.filter(recipe => {
      // Apply veg/non-veg filter
      if (vegOnly && recipe.type !== 'veg') {
        return false;
      }

      // Check if user has at least one ingredient for the recipe
      const hasAnyIngredient = recipe.ingredients.some(recipeIng =>
        userIngredients.includes(recipeIng.name.toLowerCase())
      );
      return hasAnyIngredient;
    });

    setSuggestedRecipes(filteredRecipes);
    setSelectedRecipe(null); // Clear selected recipe when new suggestions are made

    if (filteredRecipes.length === 0) {
      showModal("No recipes found with your ingredients. Try adding more!");
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const getMissingIngredients = (recipe) => {
    const userIngredients = availableIngredients.toLowerCase().split(',').map(item => item.trim()).filter(item => item !== '');
    return recipe.ingredients.filter(recipeIng =>
      !userIngredients.includes(recipeIng.name.toLowerCase())
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Recipe Suggester</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">What ingredients do you have?</h2>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-y"
          rows="4"
          placeholder="e.g., pasta, onion, garlic, chicken, broccoli"
          value={availableIngredients}
          onChange={(e) => setAvailableIngredients(e.target.value)}
        ></textarea>
        <div className="flex items-center mb-6">
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
              Show Veg Recipes Only
            </div>
          </label>
        </div>
        <button
          onClick={handleSuggestRecipes}
          className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Suggest Recipes
        </button>
      </div>

      {suggestedRecipes.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Suggested Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 ease-in-out"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Type:</span> {recipe.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                </p>
                <p className="text-primary text-sm font-semibold mt-2">Click for details</p>
              </div>
            ))}
          </div>

          {selectedRecipe && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedRecipe.name} Details</h3>
              <p className="text-gray-700 mb-4">{selectedRecipe.instructions}</p>

              <h4 className="text-xl font-semibold text-gray-800 mb-3">Ingredients:</h4>
              <ul className="list-disc pl-6 mb-4">
                {selectedRecipe.ingredients.map((ing, index) => (
                  <li key={index} className="text-gray-700">
                    {ing.name} - {ing.quantity}
                  </li>
                ))}
              </ul>

              {getMissingIngredients(selectedRecipe).length > 0 && (
                <div>
                  <h4 className="text-xl font-semibold text-red-600 mb-3">Missing Ingredients:</h4>
                  <ul className="list-disc pl-6 mb-4 text-red-600">
                    {getMissingIngredients(selectedRecipe).map((ing, index) => (
                      <li key={index}>
                        {ing.name} - {ing.quantity}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => showModal("Feature: Add missing ingredients to cart (Not implemented in this basic version)")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    Add Missing to Cart (Mock)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {suggestedRecipes.length === 0 && availableIngredients && (
        <p className="text-center text-gray-600 text-xl py-10">No recipes found matching your ingredients. Try different combinations!</p>
      )}
    </div>
  );
}

export default RecipeSuggester;