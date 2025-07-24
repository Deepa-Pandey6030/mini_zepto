// src/data/products.js

// Categories with proper category images
export const categories = [
  {
    name: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center'
  },
  {
    name: 'Dairy & Bakery',
    image: 'https://st2.depositphotos.com/1182783/10952/i/450/depositphotos_109520064-still-life-with-bakery-products-and-glass-of-milk.jpg'
  },
  {
    name: 'Snacks & Beverages',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop&crop=center'
  },
  {
    name: 'Personal Care',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop&crop=center'
  },
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center'
  },
  {
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop&crop=center'
  },
  {
    name: 'Ready to Eat',
    image: 'https://m.media-amazon.com/images/I/71fzF3r1nQL.jpg'
  },
  {
    name: 'Cleaning Supplies',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&crop=center'
  }
];

// Products with actual product images matching their names
export const products = [
  // Fruits & Vegetables
  {
    id: 1,
    name: 'Fresh Bananas',
    price: 2.99,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 2,
    name: 'Red Apples',
    price: 4.50,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 3,
    name: 'Fresh Tomatoes',
    price: 3.25,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: '/tomatoes.jpg' // Corrected local path
  },
  {
    id: 4,
    name: 'Spinach Leaves',
    price: 2.80,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 5,
    name: 'Fresh Carrots',
    price: 1.95,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 6,
    name: 'Broccoli',
    price: 3.75,
    category: 'Fruits & Vegetables',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=300&fit=crop&crop=center'
  },

  // Dairy & Bakery
  {
    id: 7,
    name: 'Whole Milk',
    price: 3.50,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 8,
    name: 'Fresh Bread',
    price: 2.25,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 9,
    name: 'Greek Yogurt',
    price: 4.99,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 10,
    name: 'Cheddar Cheese',
    price: 6.75,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 11,
    name: 'Croissants',
    price: 5.50,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: '/croissants.jpg' // Corrected local path
  },
  {
    id: 12,
    name: 'Butter',
    price: 4.25,
    category: 'Dairy & Bakery',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop&crop=center'
  },

  // Ready to Eat (including Pizza)
  {
    id: 13,
    name: 'Margherita Pizza',
    price: 12.99,
    category: 'Ready to Eat',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 14,
    name: 'Pepperoni Pizza',
    price: 15.99,
    category: 'Ready to Eat',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 15,
    name: 'Chicken Burger',
    price: 8.99,
    category: 'Ready to Eat',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 16,
    name: 'Veggie Burger',
    price: 7.99,
    category: 'Ready to Eat',
    type: 'veg',
    image: '/vegburger.jpg' // Corrected local path
  },
  {
    id: 17,
    name: 'French Fries',
    price: 4.99,
    category: 'Ready to Eat',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 18,
    name: 'Fried Chicken',
    price: 11.99,
    category: 'Ready to Eat',
    type: 'non-veg',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&crop=center'
  },

  // Snacks & Beverages
  {
    id: 19,
    name: 'Potato Chips',
    price: 3.99,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: '/potatochips.jpg' // Corrected local path
  },
  {
    id: 20,
    name: 'Coca Cola',
    price: 1.99,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 21,
    name: 'Orange Juice',
    price: 4.25,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 22,
    name: 'Chocolate Cookies',
    price: 5.99,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: '/cookies.jpg' // Corrected local path
  },
  {
    id: 23,
    name: 'Energy Drink',
    price: 3.49,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: '/energydrink.jpg' // Corrected local path
  },
  {
    id: 24,
    name: 'Popcorn',
    price: 2.99,
    category: 'Snacks & Beverages',
    type: 'veg',
    image: '/popcorn.jpg' // Corrected local path
  },

  // Electronics
  {
    id: 25,
    name: 'iPhone Charger',
    price: 19.99,
    category: 'Electronics',
    type: 'n/a',
    image: '/iphone charger.jpg' // Corrected local path
  },
  {
    id: 26,
    name: 'Bluetooth Headphones',
    price: 79.99,
    category: 'Electronics',
    type: 'n/a',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 27,
    name: 'USB Cable',
    price: 9.99,
    category: 'Electronics',
    type: 'n/a',
    image: '/usb cable.jpg' // Corrected local path
  },
  {
    id: 28,
    name: 'Power Bank',
    price: 24.99,
    category: 'Electronics',
    type: 'n/a',
    image: '/powerbank.png' // Corrected local path
  },
  {
    id: 29,
    name: 'Phone Case',
    price: 14.99,
    category: 'Electronics',
    type: 'n/a',
    image: '/phone case.jpg' // Corrected local path
  },

  // Personal Care
  {
    id: 30,
    name: 'Shampoo Bottle',
    price: 8.99,
    category: 'Personal Care',
    type: 'n/a',
    image: 'https://media.istockphoto.com/id/1356587396/photo/shampoo-and-hair-conditioner-bottle-with-soapy-bubbles-beauty-hair-care-cosmetic-packaging.jpg?s=612x612&w=0&k=20&c=jM2woyBay4kGCbVsLVqvx1ZXWDU6KLAGGan3DMoTFgU='
  },
  {
    id: 31,
    name: 'Toothpaste',
    price: 4.50,
    category: 'Personal Care',
    type: 'n/a',
    image: '/toothpaste.jpg' // Corrected local path
  },
  {
    id: 32,
    name: 'Body Soap',
    price: 3.25,
    category: 'Personal Care',
    type: 'n/a',
    image: '/bodysoap.jpg' // Corrected local path
  },
  {
    id: 33,
    name: 'Face Wash',
    price: 6.99,
    category: 'Personal Care',
    type: 'n/a',
    image: '/facewash.jpg' // Corrected local path
  },
  {
    id: 34,
    name: 'Deodorant',
    price: 7.99,
    category: 'Personal Care',
    type: 'n/a',
    image: '/deo.jpg' // Corrected local path
  },

  // Home & Kitchen
  {
    id: 35,
    name: 'Coffee Mug',
    price: 12.99,
    category: 'Home & Kitchen',
    type: 'n/a',
    image: '/coffeemug.jpg' // Corrected local path
  },
  {
    id: 36,
    name: 'Kitchen Knife',
    price: 29.99,
    category: 'Home & Kitchen',
    type: 'n/a',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 37,
    name: 'Cutting Board',
    price: 18.99,
    category: 'Home & Kitchen',
    type: 'n/a',
    image: '/cuttiingboard.jpg' // Corrected local path
  },
  {
    id: 38,
    name: 'Dinner Plates',
    price: 34.99,
    category: 'Home & Kitchen',
    type: 'n/a',
    image: '/dinnerplates.jpeg' // Corrected local path
  },
  {
    id: 39,
    name: 'Glass Bowl Set',
    price: 22.99,
    category: 'Home & Kitchen',
    type: 'n/a',
    image: '/glass bowl set.jpg' // Corrected local path
  },

  // Cleaning Supplies
  {
    id: 40,
    name: 'Dish Soap',
    price: 3.99,
    category: 'Cleaning Supplies',
    type: 'n/a',
    image: '/dishsoap.jpg' // Corrected local path
  },
  {
    id: 41,
    name: 'Floor Cleaner',
    price: 6.99,
    category: 'Cleaning Supplies',
    type: 'n/a',
    image: '/floorcleaner.jpg' // Corrected local path
  },
  {
    id: 42,
    name: 'Paper Towels',
    price: 8.99,
    category: 'Cleaning Supplies',
    type: 'n/a',
    image: '/papettowels.jpg' // Corrected local path
  },
  {
    id: 43,
    name: 'Toilet Paper',
    price: 12.99,
    category: 'Cleaning Supplies',
    type: 'n/a',
    image: '/toiletpaper.jpg' // Corrected local path
  },
  {
    id: 44,
    name: 'All-Purpose Cleaner',
    price: 5.99,
    category: 'Cleaning Supplies',
    type: 'n/a',
    image: '/allpurpose cleaner.jpg' // Corrected local path
  }
];