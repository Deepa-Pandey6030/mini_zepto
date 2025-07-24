// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext.jsx'; // Added .jsx extension
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart, showModal } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      showModal("Your cart is empty!");
      return;
    }
    // In a real app, this would involve sending order data to a backend
    showModal('Order Placed Successfully!');
    clearCart(); // Clear cart after placing order
    navigate('/receipt'); // Navigate to receipt page
  };

  // Function to handle quantity decrement
  const handleDecrement = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      // If quantity is 1 and decremented, remove the item
      removeFromCart(itemId);
    }
  };

  // Function to handle quantity increment
  const handleIncrement = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 text-xl mb-4">Your cart is currently empty.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-300 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-0.3s ease-in-out shadow-md hover:shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Cart Items List */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-center justify-between py-4">
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/CCCCCC/000000?text=No+Image'; }}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2"> {/* Adjusted spacing */}
                  {/* Quantity Control with Plus/Minus Buttons */}
                  <button
                    onClick={() => handleDecrement(item.id, item.quantity)}
                    className="bg-gray-200 text-gray-700 font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-800 w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(item.id, item.quantity)}
                    className="bg-blue-400 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                  >
                    +
                  </button>
                  {/* Removed the 'Remove' button */}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary and Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Total: ${getTotalPrice().toFixed(2)}</p>
            <div className="flex space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
