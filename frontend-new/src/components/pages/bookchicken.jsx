import React, { useState } from 'react';
import logo from './images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const BookChicken = () => {
  const [kgs, setKgs] = useState('');
  const [count, setCount] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState({ name: 'Betty' }); // mock user
  const navigate = useNavigate();

  const pricePerKg = 380; // in KES
  const totalWeight = kgs && count ? (kgs * count).toFixed(1) : '0.0';
  const totalPrice = kgs && count ? (kgs * count * pricePerKg).toFixed(2) : '0.00';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking:', { kgs, count, totalWeight, totalPrice, location });
  };

  const handleLogout = () => {
    setUser(null); // clear user (mock)
    navigate('/login'); // redirect to login
  };

  return (
    <div className="relative flex items-center justify-center w-screen min-h-screen px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      
      {/* User info & logout button */}
      {user && (
        <div className="absolute flex items-center space-x-4 top-6 right-6">
          <span className="text-sm font-medium text-gray-700">
            Logged in as <span className="font-bold text-green-800">{user.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white transition-all bg-red-500 rounded-full shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="object-contain mb-2 w-36 h-36 md:w-40 md:h-40"
          />
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Order Fresh Chicken
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 border border-green-100 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl"
        >
          {/* Price per KG */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price per Kg
            </label>
            <div className="w-full px-3 py-2 font-semibold text-gray-800 rounded-lg bg-green-50">
              KES {pricePerKg}
            </div>
          </div>

          {/* Select weight */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Weight per Chicken (kg)
            </label>
            <select
              value={kgs}
              onChange={(e) => setKgs(e.target.value)}
              required
              className="w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>
                Choose weight
              </option>
              {[1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 'Over 2'].map((weight) => (
                <option key={weight} value={weight}>
                  {weight} kg
                </option>
              ))}
            </select>
          </div>

          {/* Number of chickens */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Number of Chickens
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 3"
            />
          </div>

          {/* Total weight */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Total Weight
            </label>
            <div className="w-full px-3 py-2 font-semibold text-gray-800 rounded-lg bg-green-50">
              {totalWeight} kg
            </div>
          </div>

          {/* Total price */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Total Price
            </label>
            <div className="w-full px-3 py-2 font-semibold text-gray-800 rounded-lg bg-green-50">
              KES {totalPrice}
            </div>
          </div>

          {/* Delivery location */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Delivery Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Nairobi, Kenya"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={() => navigate('/confirmation')}
            className="w-full py-2 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookChicken;
