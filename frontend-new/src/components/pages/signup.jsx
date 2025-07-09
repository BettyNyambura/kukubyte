import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/register', formData);
      console.log('Signup successful:', response.data);
      setSuccessMessage('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      const msg = error.response?.data?.error || 'Signup failed';
      console.error('Signup failed:', msg);
      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-green-100 via-white to-red-100 flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          📝 Create Your Account
        </h2>

        <div className="space-y-3">
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          )}
        </div>

        <div className="space-y-5 mt-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 hover:text-black transition-all shadow-lg"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-green-600 hover:text-green-800 font-semibold underline hover:no-underline transition-all"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
