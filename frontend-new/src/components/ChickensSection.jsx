import React from 'react';
import { Link } from 'react-router-dom';
import logo from './pages/images/logo.jpg'

const ChickenCard = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 text-center">
      <img
        src={logo}
        alt="Logo"
        className="w-36 h-36 md:w-40 md:h-40 object-contain mb-2 mx-auto"
      />  
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Broiler Chicken</h3>
      <p className="text-lg text-gray-600 mb-4">Sold per kilogram</p>
      <p className="text-3xl font-bold text-green-600 mb-6">KES 380 / KG</p>
      <Link
        to="/signup"
        className="inline-block bg-gradient-to-r from-green-600 to-lime-500 text-white px-6 py-3 rounded-full font-medium shadow-md hover:from-green-700 hover:to-lime-600 transition"
      >
        Order Now
      </Link>
    </div>
  );
};

const ChickensSection = () => {
  return (
    <section id="chickens" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-green-800 mb-4 tracking-tight">
          Farm Fresh Broiler Chickens
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Get clean, fully matured chickens straight from the farm.
        </p>
        <div className="max-w-md mx-auto">
          <ChickenCard />
        </div>
      </div>
    </section>
  );
};

export default ChickensSection;
