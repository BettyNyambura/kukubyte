import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/auth/login',
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log('Login success:', response.data);

      // Save token if returned
      if (response.data.access_token) {
        const token = response.data.access_token;
        localStorage.setItem('access_token', token);

        // Fetch user profile to get role
        const profileRes = await axios.get('http://127.0.0.1:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const role = profileRes.data.role;
        localStorage.setItem('user_role', role);

        // Navigate based on role
        if (role === 'admin') {
          navigate('/admindash');
        } else {
          navigate('/dashboard');
        }
      }

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      // Show error message to user
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    // Add forgot password logic here
    console.log('Forgot password clicked');
    // Example: navigate to forgot password page or show modal
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-red-100 via-white to-green-100 flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
          🔐 Welcome Back
        </h2>
        <div className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-red-600 hover:text-red-800 underline hover:no-underline transition-all"
            >
              Forgot password?
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 hover:text-black transition-all shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link 
                to="/signup" 
                className="text-red-600 hover:text-red-800 font-semibold underline hover:no-underline transition-all"
            >
                Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;