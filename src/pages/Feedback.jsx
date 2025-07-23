// src/pages/Feedback.jsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext'; // For showing modal messages

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showModal } = useCart(); // Use showModal for feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this feedback data to a backend API
    console.log('Feedback Submitted:', { rating, comment });
    setSubmitted(true);
    showModal('Thank you for your valuable feedback!');
    // Optionally, clear the form after a short delay or navigate away
    setTimeout(() => {
      setRating(0);
      setComment('');
      setSubmitted(false); // Allow re-submission
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Feedback Matters!</h2>
        {submitted ? (
          <div className="text-center text-green-600 text-2xl font-semibold py-10 animate-fade-in">
            Thank you for your feedback!
            <p className="text-lg text-gray-600 mt-2">We appreciate your input.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-3">
                Overall Rating:
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-5xl transition-colors duration-200 ease-in-out ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } hover:text-yellow-500 focus:outline-none transform hover:scale-110`}
                    aria-label={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                Comments (Optional):
              </label>
              <textarea
                id="comment"
                rows="5"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out resize-y"
                placeholder="Share your experience or suggestions..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Feedback;