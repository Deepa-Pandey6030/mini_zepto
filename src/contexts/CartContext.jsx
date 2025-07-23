// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Create a custom hook to use the Cart Context
export const useCart = () => {
  return useContext(CartContext);
};

// Create the Cart Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Function to show a temporary modal message
  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setModalMessage('');
    }, 2000); // Modal disappears after 2 seconds
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        showModal(`${product.name} quantity updated in cart!`);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item is new, add it with quantity 1
        showModal(`${product.name} added to cart!`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === productId);
      if (itemToRemove) {
        showModal(`${itemToRemove.name} removed from cart.`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      showModal(`Quantity updated!`);
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showModal('Cart cleared!');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        showModal, // Expose showModal for direct use
      }}
    >
      {children}
      {/* Global Modal Component */}
      {isModalOpen && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in-up">
          {modalMessage}
        </div>
      )}
    </CartContext.Provider>
  );
};