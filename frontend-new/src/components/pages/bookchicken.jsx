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
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 relative">
      
      {/* User info & logout button */}
      {user && (
        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Logged in as <span className="text-green-800 font-bold">{user.username}</span>
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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-green-100 space-y-4"
        >
          {/* Price per Kg */}
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
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
