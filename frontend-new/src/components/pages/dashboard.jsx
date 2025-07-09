import React from 'react';
import logo from './images/logo.jpg'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';


const Dashboard = () => {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent flex items-center space-x-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-20 h-20 rounded-full bg-green-100 p-2 object-contain max-w-fit"
                />
                <span>Welcome Back!</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your chicken orders with ease</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Premium Member
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                J
              </div>
              <button
                className="bg-red-500 text-white hover:text-black px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-md flex items-center space-x-2"
                onClick={() => {
                  console.log('Logout clicked');
                  navigate('/login');
                }}
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🗓️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Saved</p>
                <p className="text-2xl font-bold text-gray-800">$240</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Book Chicken Card */}
          <div className="group bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-start justify-between mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">📦</span>
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                Available Now
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Fresh Chicken Delivery</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Premium quality chicken delivered fresh to your doorstep. Choose from our variety of cuts and sizes.
            </p>
            <div className="flex items-center justify-between">
              <Link
                to="/bookchicken"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Now →
              </Link>
              <div className="text-green-600 text-sm font-medium">
                Next delivery: Today
              </div>
            </div>
          </div>

          {/* Orders Card */}
          {/* <div className="group bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="flex items-start justify-between mb-6">
              <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">🧾</span>
              </div>
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                3 Active
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Management</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Track your orders, view delivery status, and manage your purchase history all in one place.
            </p>
            <div className="flex items-center justify-between">
              <a
                href="/orders"
                className="bg-green-50 text-green-600 px-8 py-4 rounded-2xl font-semibold hover:bg-green-100 transition-all duration-300 border border-green-200 hover:border-green-300"
              >
                View Orders →
              </a>
              <div className="text-green-600 text-sm font-medium">
                Last order: 2 days ago
              </div>
            </div>
          </div> */}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-lg">🚚</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1234 delivered</p>
                <p className="text-sm text-gray-600">2 kg whole chicken - 2 days ago</p>
              </div>
              <div className="text-green-600 font-medium">✓ Completed</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-2xl">
              <div className="bg-yellow-100 p-2 rounded-full">
                <span className="text-lg">📦</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1235 in transit</p>
                <p className="text-sm text-gray-600">1.5 kg chicken breast - Expected today</p>
              </div>
              <div className="text-yellow-600 font-medium">🚚 In Transit</div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-lg">📝</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1236 confirmed</p>
                <p className="text-sm text-gray-600">3 kg mixed cuts - Processing</p>
              </div>
              <div className="text-blue-600 font-medium">⏳ Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;