// src/data/recipes.js

export const recipes = [
  {
    id: 'r1',
    name: 'Classic Tomato Pasta',
    ingredients: [
      { name: 'Pasta', quantity: '200g' },
      { name: 'Canned Tomatoes', quantity: '400g' },
      { name: 'Onion', quantity: '1 medium' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Olive Oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Pepper', quantity: 'to taste' },
      { name: 'Fresh Basil', quantity: 'a few leaves' },
    ],
    instructions: 'Boil pasta. Sauté onion and garlic. Add tomatoes, season, and simmer. Combine with pasta and basil.',
    type: 'veg',
  },
  {
    id: 'r2',
    name: 'Chicken Stir-fry',
    ingredients: [
      { name: 'Chicken Breast', quantity: '300g' },
      { name: 'Broccoli', quantity: '1 head' },
      { name: 'Carrots', quantity: '2 medium' },
      { name: 'Bell Pepper', quantity: '1 large' },
      { name: 'Soy Sauce', quantity: '3 tbsp' },
      { name: 'Ginger', quantity: '1 inch piece' },
      { name: 'Garlic', quantity: '3 cloves' },
      { name: 'Sesame Oil', quantity: '1 tbsp' },
      { name: 'Rice', quantity: '200g' },
    ],
    instructions: 'Cook rice. Slice chicken and vegetables. Stir-fry chicken, then add vegetables. Add sauces and serve over rice.',
    type: 'non-veg',
  },
  {
    id: 'r3',
    name: 'Vegetable Curry',
    ingredients: [
      { name: 'Potatoes', quantity: '2 medium' },
      { name: 'Cauliflower', quantity: '1/2 head' },
      { name: 'Peas', quantity: '1 cup' },
      { name: 'Onion', quantity: '1 medium' },
      { name: 'Ginger', quantity: '1 inch piece' },
      { name: 'Garlic', quantity: '2 cloves' },
      { name: 'Curry Powder', quantity: '2 tbsp' },
      { name: 'Coconut Milk', quantity: '400ml' },
      { name: 'Rice', quantity: '200g' },
    ],
    instructions: 'Sauté onion, ginger, garlic. Add curry powder, vegetables, and coconut milk. Simmer until tender. Serve with rice.',
    type: 'veg',
  },
];