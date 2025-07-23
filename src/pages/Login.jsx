// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // To show modal message

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showModal } = useCart(); // Use showModal for feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side "authentication" for hackathon purposes
    if (username === 'user' && password === 'password') {
      showModal('Login Successful! Welcome to JHUPTO.');
      navigate('/'); // Redirect to home page on successful login
    } else {
      showModal('Invalid Username or Password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Login to JHUPTO</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-md mt-6">
          Don't have an account? <span className="text-primary hover:underline cursor-pointer font-semibold">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;