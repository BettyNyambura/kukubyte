import React, { useState } from 'react';
import logo from './images/logo.jpg';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 relative">
      
      {/* User info & logout button */}
      {user && (
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Logged in as <span className="text-green-800 font-bold">{user.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full shadow-md transition-all"
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
            className="w-36 h-36 md:w-40 md:h-40 object-contain mb-2"
          />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            Order Fresh Chicken
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-green-100 space-y-4"
        >
          {/* Price per KG */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Price per Kg
            </label>
            <div className="w-full bg-green-50 px-3 py-2 rounded-lg text-gray-800 font-semibold">
              KES {pricePerKg}
            </div>
          </div>

          {/* Select weight */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Weight per Chicken (kg)
            </label>
            <select
              value={kgs}
              onChange={(e) => setKgs(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-800"
            >
              <option value="" disabled>
                Choose weight
              </option>
              {[1, 1.5, 2, 2.5, 3].map((weight) => (
                <option key={weight} value={weight}>
                  {weight} kg
                </option>
              ))}
            </select>
          </div>

          {/* Number of chickens */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Number of Chickens
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              min="1"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 3"
            />
          </div>

          {/* Total weight */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Total Weight
            </label>
            <div className="w-full bg-green-50 px-3 py-2 rounded-lg text-gray-800 font-semibold">
              {totalWeight} kg
            </div>
          </div>

          {/* Total price */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Total Price
            </label>
            <div className="w-full bg-green-50 px-3 py-2 rounded-lg text-gray-800 font-semibold">
              KES {totalPrice}
            </div>
          </div>

          {/* Delivery location */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Delivery Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Nairobi, Kenya"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookChicken;
