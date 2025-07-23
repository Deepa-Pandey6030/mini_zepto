// src/pages/Receipt.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // For cart data if needed

function Receipt() {
  const { getTotalPrice, cartItems } = useCart(); // Get cart items and total from context
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null); // State for delivery time

  useEffect(() => {
    // Simulate fetching/generating order details after successful order placement
    // In a real app, this would come from an API response
    const orderId = `JHUPTO-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    setOrderDetails({
      orderId: orderId,
      date: date,
      total: getTotalPrice().toFixed(2),
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      deliveryAddress: '123 Innovation Street, Hackathon City, 90210', // Mock address
    });

    // Start fake delivery time countdown
    let seconds = Math.floor(Math.random() * (1200 - 600 + 1)) + 600; // 10-20 minutes in seconds
    setDeliveryTime(seconds);

    const timer = setInterval(() => {
      setDeliveryTime(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [cartItems, getTotalPrice]); // Depend on cartItems and getTotalPrice

  const formatTime = (seconds) => {
    if (seconds <= 0) return "Delivered!";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!orderDetails) {
    return <div className="text-center p-8 text-xl text-gray-700">Loading your receipt...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-3xl border border-gray-100">
        <h2 className="text-5xl font-extrabold text-center mb-6 text-green-600">Order Confirmed!</h2>
        <p className="text-center text-gray-700 text-lg mb-8">Thank you for your purchase from JHUPTO!</p>

        {/* Order Details Summary */}
        <div className="border-t border-b border-gray-200 py-6 mb-8">
          <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Order ID:</span> {orderDetails.orderId}</p>
          <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Date:</span> {orderDetails.date}</p>
          <p className="text-gray-700 text-lg mb-2"><span className="font-semibold">Total Amount:</span> ${orderDetails.total}</p>
          <p className="text-gray-700 text-lg"><span className="font-semibold">Delivery Address:</span> {orderDetails.deliveryAddress}</p>
        </div>

        {/* Items Ordered */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Items Ordered:</h3>
        <ul className="list-disc pl-6 mb-8">
          {orderDetails.items.map((item, index) => (
            <li key={index} className="text-gray-700 mb-1">
              {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
            </li>
          ))}
        </ul>

        {/* Delivery Estimate */}
        <div className="text-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg mb-8 shadow-inner">
          <p className="text-2xl font-bold">Estimated Delivery:</p>
          <p className="text-4xl font-extrabold mt-2 animate-pulse">{formatTime(deliveryTime)}</p>
          <p className="text-lg mt-2">(Delivery in 10-20 mins - Simulated)</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg text-center transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          <Link
            to="/feedback"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg text-center transform hover:scale-105"
          >
            Give Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Receipt;