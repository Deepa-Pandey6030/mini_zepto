// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './components/Cart';
import Receipt from './pages/Receipt';
import Feedback from './pages/Feedback';
import RecipeSuggester from './pages/RecipeSuggester';
import GroupPurchase from './pages/GroupPurchase';
import Location from './pages/Location';
import DeliveryTracker from './pages/DeliveryTracker';
import PaymentPage from './pages/PaymentPage'; // Import the new component
import Petooram from './components/petooram';
import { useCart } from './contexts/CartContext';

function App() {
  const { showModal } = useCart();

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-inter">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} /> {/* New Route */}
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/recipe-suggester" element={<RecipeSuggester />} />
            <Route path="/group-purchase" element={<GroupPurchase />} />
            <Route path="/location" element={<Location />} />
            <Route path="/track-delivery" element={<DeliveryTracker />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <Footer />
        <Petooram />
      </div>
    </Router>
  );
}

export default App;