import React, { useState, useEffect } from 'react';
import logo from './images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookChicken = () => {
  const [kgs, setKgs] = useState('');
  const [count, setCount] = useState('');
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const pricePerKg = 380; // in KES
  const totalWeight = kgs && count ? (parseFloat(kgs) * parseInt(count)).toFixed(1) : '0.0';
  const totalPrice = kgs && count ? (parseFloat(kgs) * parseInt(count) * pricePerKg).toFixed(2) : '0.00';

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://127.0.0.1:5000/api/orders',
        {
          kgs: parseFloat(kgs),
          count: parseInt(count),
          location: location
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('Order created:', response.data);
      navigate('/confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.response?.data?.error || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  return (
    <div className="relative flex items-center justify-center w-screen min-h-screen px-4 bg-gradient-to-br from-green-50 via-white to-green-50">
      
      {/* User info & logout button */}
      {user && (
        <div className="absolute flex items-center space-x-4 top-6 right-6">
          <span className="text-sm font-medium text-gray-700">
            Logged in as <span className="text-green-800 font-bold">{user.username}</span>
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 border border-green-100 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl"
        >
          {/* Price per Kg */}
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
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          {/* Back to Dashboard */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all"
          >
            Back to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookChicken;
