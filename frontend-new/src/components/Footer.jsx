import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">🐔 Kukubyte</div>
          <p className="text-green-100 mb-4">Fresh Farm Chicken, Delivered to You</p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#home" className="hover:text-green-200 transition-colors">Home</a>
            <a href="#about" className="hover:text-green-200 transition-colors">About</a>
            <a href="#contact" className="hover:text-green-200 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-green-200">
            &copy; 2025 Kukubyte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;