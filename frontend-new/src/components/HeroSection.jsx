import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-green-100 to-green-200 py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 leading-tight">
          Book Fresh Farm Chicken Today
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          We raise and deliver quality poultry directly to you—book online now!
        </p>
        <a 
          href="#signup" 
          className="bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;