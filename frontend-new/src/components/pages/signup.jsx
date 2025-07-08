import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup form submitted:', formData);
    // Example: call your API
    // signupUser(formData);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-green-100 via-white to-red-100 flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-xl p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          📝 Create Your Account
        </h2>
        <div className="space-y-5">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
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