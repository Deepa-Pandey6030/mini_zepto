// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editErrors, setEditErrors] = useState({});
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
    // Check if user is already logged in
    const userData = localStorage.getItem('jhupto-user');
    if (userData) {
      setUser(JSON.parse(userData));
      setShowProfile(true);
    }
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

  const smoothTransitionToLogin = () => {
    // First, clear the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    
    // Then transition to login with a smooth animation
    setTimeout(() => {
      setIsLogin(true);
    }, 300);
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
        name: 'Aarya Patil', // This would come from API
        email: formData.email,
        phone: '+1234567890',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=f97316&color=fff&size=128`
      };
      localStorage.setItem('jhupto-user', JSON.stringify(userData));
      setUser(userData);
      setShowProfile(true);
      
      // Success message
      alert('Login successful!');
    } else {
      // Simulate signup
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=f97316&color=fff&size=128`
      };
      localStorage.setItem('jhupto-user', JSON.stringify(userData));
      
      // Success message
      alert('Account created successfully! Please login with your credentials.');
      
      // Smooth transition to login
      setIsLoading(false);
      smoothTransitionToLogin();
      return;
    }

    setIsLoading(false);
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

  const handleLogout = () => {
    localStorage.removeItem('jhupto-user');
    setUser(null);
    setShowProfile(false);
    setShowCredentials(false);
    setIsEditing(false);
    setEditData({ name: '', email: '', phone: '' });
    setEditErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleEditProfile = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setEditErrors({});
    setIsEditing(true);
    setShowCredentials(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (editErrors[name]) {
      setEditErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {};

    if (!editData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!editData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!editData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setEditErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateEditForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedUser = {
      ...user,
      name: editData.name,
      email: editData.email,
      phone: editData.phone
    };

    localStorage.setItem('jhupto-user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setIsLoading(false);
    
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ name: '', email: '', phone: '' });
    setEditErrors({});
  };

  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // If user is logged in, show profile view
  if (showProfile && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-25 animate-ping"></div>
        </div>

        {/* Profile Container */}
        <div className="relative w-full max-w-md transform transition-all duration-1000 ease-out">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              JHUPTO
            </h1>
            <p className="text-gray-600 text-lg">Welcome back, {user.name}!</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
            
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
              <div className="relative inline-block">
                <div 
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-500 cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg"
                  onClick={() => setShowCredentials(!showCredentials)}
                >
                  {generateInitials(user.name)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-white text-xl font-semibold mt-3">{user.name}</h3>
              <p className="text-orange-100 text-sm">Click profile to view details</p>
            </div>

            {/* Credentials Panel */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showCredentials ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                    <span className="mr-2">👤</span>
                    Account Information
                  </h4>
                  <button
                    onClick={handleEditProfile}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-white rounded-lg border">
                    <span className="text-gray-400 text-lg mr-3">📧</span>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white rounded-lg border">
                    <span className="text-gray-400 text-lg mr-3">📱</span>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white rounded-lg border">
                    <span className="text-gray-400 text-lg mr-3">🏷️</span>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Panel */}
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isEditing ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-6 bg-orange-50 border-t">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">✏️</span>
                  Edit Profile
                </h4>
                
                <div className="space-y-4">
                  {/* Edit Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          editErrors.name 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">👤</span>
                      </div>
                    </div>
                    {editErrors.name && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{editErrors.name}</p>
                    )}
                  </div>

                  {/* Edit Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          editErrors.email 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Enter your email"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">📧</span>
                      </div>
                    </div>
                    {editErrors.email && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{editErrors.email}</p>
                    )}
                  </div>

                  {/* Edit Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleEditInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                          editErrors.phone 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-orange-500'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-xl">📱</span>
                      </div>
                    </div>
                    {editErrors.phone && (
                      <p className="text-red-500 text-sm mt-1 animate-[shake_0.5s_ease-in-out]">{editErrors.phone}</p>
                    )}
                  </div>

                  {/* Edit Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
                    >
                      <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        Save Changes
                      </span>
                      
                      {/* Loading Spinner */}
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={handleCancelEdit}
                      disabled={isLoading}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all duration-300 border border-gray-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`p-6 space-y-3 transition-all duration-300 ${isEditing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <button
                onClick={() => navigate('/')}
                disabled={isEditing}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={handleLogout}
                disabled={isEditing}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-all duration-300 border border-gray-200 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-orange-500 hover:text-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>←</span>
              <span>Back to Home</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

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