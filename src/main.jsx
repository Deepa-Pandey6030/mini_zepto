import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/CartContext.jsx'; // Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the entire App with CartProvider to make cart context available everywhere */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);