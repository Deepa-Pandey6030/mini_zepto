// src/data/products.js

export const products = [
  // Foods
  { id: 'f1', name: 'Margherita Pizza', price: 12.99, category: 'Foods', image: 'https://placehold.co/200x150/FF5733/FFFFFF?text=Pizza', type: 'veg', nutrition: { calories: 800, protein: 30, carbs: 90, fat: 40 } },
  { id: 'f2', name: 'Chicken Biryani', price: 15.50, category: 'Foods', image: 'https://placehold.co/200x150/FF5733/FFFFFF?text=Biryani', type: 'non-veg', nutrition: { calories: 1200, protein: 60, carbs: 120, fat: 60 } },
  { id: 'f3', name: 'Vegan Burger', price: 10.00, category: 'Foods', image: 'https://placehold.co/200x150/FF5733/FFFFFF?text=Vegan+Burger', type: 'veg', nutrition: { calories: 600, protein: 25, carbs: 70, fat: 30 } },
  { id: 'f4', name: 'Sushi Platter', price: 22.00, category: 'Foods', image: 'https://placehold.co/200x150/FF5733/FFFFFF?text=Sushi', type: 'non-veg', nutrition: { calories: 700, protein: 40, carbs: 80, fat: 25 } },

  // Groceries
  { id: 'g1', name: 'Organic Apples (1kg)', price: 3.49, category: 'Groceries', image: 'https://placehold.co/200x150/33FF57/FFFFFF?text=Apples', type: 'veg', nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 } },
  { id: 'g2', name: 'Milk (1L)', price: 2.99, category: 'Groceries', image: 'https://placehold.co/200x150/33FF57/FFFFFF?text=Milk', type: 'veg', nutrition: { calories: 60, protein: 3.2, carbs: 4.8, fat: 3.3 } },
  { id: 'g3', name: 'Brown Eggs (1 Dozen)', price: 4.50, category: 'Groceries', image: 'https://placehold.co/200x150/33FF57/FFFFFF?text=Eggs', type: 'non-veg', nutrition: { calories: 155, protein: 13, carbs: 1.1, fat: 11 } },
  { id: 'g4', name: 'Basmati Rice (5kg)', price: 8.99, category: 'Groceries', image: 'https://placehold.co/200x150/33FF57/FFFFFF?text=Rice', type: 'veg', nutrition: { calories: 350, protein: 7, carbs: 78, fat: 1 } },

  // Electronics
  { id: 'e1', name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: 'https://placehold.co/200x150/3357FF/FFFFFF?text=Headphones', type: 'n/a', nutrition: null },
  { id: 'e2', name: 'Smartwatch', price: 199.00, category: 'Electronics', image: 'https://placehold.co/200x150/3357FF/FFFFFF?text=Smartwatch', type: 'n/a', nutrition: null },
  { id: 'e3', name: 'Portable Charger', price: 25.00, category: 'Electronics', image: 'https://placehold.co/200x150/3357FF/FFFFFF?text=Charger', type: 'n/a', nutrition: null },

  // Flowers
  { id: 'fl1', name: 'Red Rose Bouquet', price: 25.00, category: 'Flowers', image: 'https://placehold.co/200x150/Ff33E8/FFFFFF?text=Roses', type: 'n/a', nutrition: null },
  { id: 'fl2', name: 'Mixed Flower Arrangement', price: 35.00, category: 'Flowers', image: 'https://placehold.co/200x150/Ff33E8/FFFFFF?text=Mixed+Flowers', type: 'n/a', nutrition: null },

  // Jewellery
  { id: 'j1', name: 'Silver Necklace', price: 89.00, category: 'Jewellery', image: 'https://placehold.co/200x150/E8FF33/FFFFFF?text=Necklace', type: 'n/a', nutrition: null },
  { id: 'j2', name: 'Diamond Earrings', price: 299.00, category: 'Jewellery', image: 'https://placehold.co/200x150/E8FF33/FFFFFF?text=Earrings', type: 'n/a', nutrition: null },
];

export const categories = [
  { name: 'Foods', image: 'https://placehold.co/150x150/FF5733/FFFFFF?text=Foods' },
  { name: 'Groceries', image: 'https://placehold.co/150x150/33FF57/FFFFFF?text=Groceries' },
  { name: 'Electronics', image: 'https://placehold.co/150x150/3357FF/FFFFFF?text=Electronics' },
  { name: 'Flowers', image: 'https://placehold.co/150x150/Ff33E8/FFFFFF?text=Flowers' },
  { name: 'Jewellery', image: 'https://placehold.co/150x150/E8FF33/FFFFFF?text=Jewellery' },
];