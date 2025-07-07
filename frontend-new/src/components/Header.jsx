import React from 'react';

const Header = () => {
  return (
    <nav className="bg-green-600 text-white p-4 fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          🐔 Kukubyte
        </div>
        <div className="space-x-6">
          <a href="#home" className="hover:text-green-200 transition-colors">Home</a>
          <a href="#about" className="hover:text-green-200 transition-colors">About</a>
          <a href="#login" className="hover:text-green-200 transition-colors">Login</a>
          <a href="#signup" className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-100 transition-colors">
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;