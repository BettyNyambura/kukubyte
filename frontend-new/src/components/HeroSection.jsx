import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="pt-32 pb-20 bg-gradient-to-r from-green-100 via-white to-red-100"
    >
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight drop-shadow-sm">
          Fresh Farm Chicken Delivered to Your Door
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          We raise premium poultry with care and deliver directly to you. No middlemen. Just healthy, tasty chicken!
        </p>
        <Link
          to="/signup"
          className="bg-red-500 hover:bg-red-600 text-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-md hover:shadow-xl transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
