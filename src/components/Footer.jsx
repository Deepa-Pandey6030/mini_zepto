// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 text-center mt-auto rounded-t-lg">
      <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} NIMBUS. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-3 text-sm md:text-base">
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 ease-in-out">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 ease-in-out">Terms of Service</a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 ease-in-out">Contact Us</a>
      </div>
    </footer>
  );
}

export default Footer;