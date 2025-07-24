// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
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
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-200 ease-in-out"
                  >
                    Remove
                  </button>
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