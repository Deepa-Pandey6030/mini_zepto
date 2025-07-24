// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

// IMPORTANT: No Razorpay Key ID needed for this simulated version.
// const RAZORPAY_KEY_ID = "rzp_test_9EdaqW6XKYnfhI"; // <<<=== REMOVE OR COMMENT OUT THIS LINE ===>>>

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart, getTotalPrice, showModal } = useCart(); // Ensure showModal is available

  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending', 'processing', 'success', 'failed'
  const [orderId, setOrderId] = useState(location.state?.orderId || 'N/A');
  const [amount, setAmount] = useState(location.state?.amount || 0);

  // No need to load Razorpay SDK script for this simulated version
  useEffect(() => {
    // If no orderId or amount is passed, redirect back to cart
    if (!location.state?.orderId || !location.state?.amount) {
      console.warn("No order ID or amount passed to payment page. Redirecting to cart.");
      navigate('/cart', { replace: true });
      return;
    }
    setOrderId(location.state.orderId);
    setAmount(location.state.amount);
  }, [location.state, navigate]);

  const simulatePayment = () => {
    setPaymentStatus('processing');
    // Simulate payment processing time
    setTimeout(() => {
      const isPaymentSuccessful = Math.random() > 0.1; // 90% chance of success for demo

      if (isPaymentSuccessful) {
        setPaymentStatus('success');
        clearCart(); // Clear cart on successful payment
        showModal("Payment Successful! Redirecting to tracking...");
        // Navigate to tracking page after a short delay
        setTimeout(() => {
          navigate('/track-delivery', { state: { orderId: orderId, paymentStatus: 'success' } });
        }, 1500);
      } else {
        setPaymentStatus('failed');
        showModal("Payment Failed. Please try again.");
      }
    }, 2000); // Simulate 2 seconds for payment processing
  };

  const handleRetryPayment = () => {
    setPaymentStatus('pending'); // Reset status to allow retrying
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Secure Payment (Simulated)</h1> {/* Updated title */}

        {paymentStatus === 'pending' && (
          <>
            <p className="text-gray-700 text-lg mb-4">Order ID: <span className="font-semibold text-primary">{orderId}</span></p>
            <p className="text-gray-700 text-2xl font-bold mb-8">Amount: <span className="text-green-600">${amount.toFixed(2)}</span></p>
            <button
              onClick={simulatePayment} // Call the simulatePayment function
              className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Pay Now (Simulated)
            </button>
          </>
        )}

        {paymentStatus === 'processing' && (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl text-gray-700 font-semibold">Processing your payment...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait.</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="text-green-600">
            <svg className="mx-auto h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-3xl font-bold mb-2">Payment Successful!</p>
            <p className="text-lg text-gray-700">Redirecting to tracking...</p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="text-red-600">
            <svg className="mx-auto h-20 w-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-3xl font-bold mb-2">Payment Failed!</p>
            <p className="text-lg text-gray-700 mb-4">There was an issue processing your payment.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleRetryPayment}
                className="bg-primary hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Retry Payment
              </button>
              <button
                onClick={handleGoToCart}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;