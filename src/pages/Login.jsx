// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mount animation
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!isLogin && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isLogin) {
      // Simulate login
      const userData = {
        name: 'John Doe', // This would come from API
        email: formData.email,
        phone: '+1234567890'
      };
      localStorage.setItem('jhupto-user', JSON.stringify(userData));
      alert('Login successful!');
    } else {
      // Simulate signup
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };
      localStorage.setItem('jhupto-user', JSON.stringify(userData));
      alert('Account created successfully!');
    }

    setIsLoading(false);
    navigate('/');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-25 animate-ping"></div>
      </div>

      {/* Main Container */}
      <div className={`relative w-full max-w-md transform transition-all duration-1000 ease-out ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`transform transition-all duration-700 delay-300 ${
            mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              JHUPTO
            </h1>
            <p className="text-gray-600 text-lg">
              {isLogin ? 'Welcome back!' : 'Join our community'}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className={`bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden transform transition-all duration-700 delay-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          
          {/* Toggle Buttons */}
          <div className="flex">
            <button
              onClick={() => !isLoading && setIsLogin(true)}
              disabled={isLoading}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-500 relative overflow-hidden ${
                isLogin 
                  ? 'text-white bg-gradient-to-r from-orange-500 to-red-500' 
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="relative z-10">Login</span>
              {isLogin && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 origin-left animate-[slideIn_0.5s_ease-out_forwards]"></div>
              )}
            </button>
            <button
              onClick={() => !isLoading && setIsLogin(false)}
              disabled={isLoading}
              className={`flex-1 py-4 text-center font-semibold transition-all duration-500 relative overflow-hidden ${
                !isLogin 
                  ? 'text-white bg-gradient-to-r from-orange-500 to-red-500' 
                  : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <span className="relative z-10">Sign Up</span>
              {!isLogin && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 origin-right animate-[slideIn_0.5s_ease-out_forwards]"></div>
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              
              {/* Name Field (Sign Up Only) */}
              <div className={`transform transition-all duration-500 ${
                !isLogin ? 'translate-x-0 opacity-100 max-h-20' : 'translate-x-5 opacity-0 max-h-0 overflow-hidden'
              }`}>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">👤</span>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{errors.name}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your email"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400 text-xl">📧</span>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{errors.email}</p>
                )}
              </div>

              {/* Phone Field (Sign Up Only) */}
              <div className={`transform transition-all duration-500 ${
                !isLogin ? 'translate-x-0 opacity-100 max-h-20' : 'translate-x-5 opacity-0 max-h-0 overflow-hidden'
              }`}>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.phone 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">📱</span>
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{errors.phone}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-orange-500'
                    }`}
                    placeholder="Enter your password"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400 text-xl">🔒</span>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              <div className={`transform transition-all duration-500 ${
                !isLogin ? 'translate-x-0 opacity-100 max-h-20' : 'translate-x-5 opacity-0 max-h-0 overflow-hidden'
              }`}>
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          errors.confirmPassword 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">🔐</span>
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
            >
              <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {isLogin ? 'Login' : 'Create Account'}
              </span>
              
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-orange-500 hover:text-orange-600 text-sm transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </div>
            )}

          </form>
        </div>

        {/* Social Login Options */}
        <div className={`mt-6 transform transition-all duration-700 delay-700 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <div className="text-center text-gray-500 mb-4">Or continue with</div>
          <div className="flex space-x-4">
            <button className="flex-1 bg-white border-2 border-gray-200 hover:border-blue-300 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              <span className="text-2xl">📘</span>
              <span className="ml-2 text-gray-700 font-medium">Facebook</span>
            </button>
            <button className="flex-1 bg-white border-2 border-gray-200 hover:border-red-300 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              <span className="text-2xl">🔍</span>
              <span className="ml-2 text-gray-700 font-medium">Google</span>
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className={`text-center mt-6 transform transition-all duration-700 delay-900 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <button
            onClick={() => navigate('/')}
            className="text-orange-500 hover:text-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}

export default Login;