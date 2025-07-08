import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-green-800 text-white p-4 fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Name */}
        <div className="flex items-center space-x-2 text-xl md:text-2xl font-bold">
          <img src={logo} alt="Kukubyte Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-white">Kukubyte</span>
        </div>

        {/* Nav Links */}
        <div className="space-x-4 md:space-x-6 text-sm md:text-base font-semibold">
          <Link to="/" className="text-gray-100 hover:text-red-300 transition-colors">Home</Link>

          {pathname === '/login' && (
            <Link
              to="/signup"
              className="bg-red-500 text-white hover:text-black px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-md"
            >
              Signup
            </Link>
          )}

          {pathname === '/signup' && (
            <Link
              to="/login"
              className="bg-green-500 text-white hover:text-black px-4 py-2 rounded-full hover:bg-green-600 transition-all shadow-md"
            >
              Login
            </Link>
          )}

          {pathname !== '/signup' && pathname !== '/login' && (
            <>
              <a href="#about" className="text-gray-100 hover:text-red-300 transition-colors">About</a>
              <Link to="/login" className="text-gray-100 hover:text-red-300 transition-colors">Login</Link>
              <Link
                to="/signup"
                className="bg-red-500 text-white hover:text-black px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
