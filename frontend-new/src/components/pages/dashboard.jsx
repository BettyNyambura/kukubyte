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
      <div className="sticky top-0 z-10 border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="px-6 py-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center space-x-2 text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text">
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain w-20 h-20 p-2 bg-green-100 rounded-full max-w-fit"
                />
                <span>Welcome Back!</span>
              </h1>
              <p className="mt-1 text-gray-600">Manage your chicken orders with ease</p>
            </div>
            <div className="items-center hidden space-x-4 md:flex">
              <div className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Premium Member
              </div>
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-green-400 to-green-600">
                J
              </div>
              <button
                className="flex items-center px-4 py-2 space-x-2 text-white transition-all bg-red-500 rounded-full shadow-md hover:text-black hover:bg-red-600"
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
      <div className="px-6 py-12 mx-auto max-w-7xl">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
          <div className="p-6 transition-all duration-300 border border-green-100 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">10</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 transition-all duration-300 border border-green-100 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">This Month</p>
                <p className="text-2xl font-bold text-gray-800">8</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">🗓️</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 transition-all duration-300 border border-green-100 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Saved</p>
                <p className="text-2xl font-bold text-gray-800">$240</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2">
          {/* Book Chicken Card */}
          <div className="p-8 transition-all duration-500 border border-green-100 shadow-xl group bg-white/80 backdrop-blur-md rounded-3xl hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 transition-transform duration-300 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl group-hover:scale-110">
                <span className="text-3xl">📦</span>
              </div>
              <div className="px-3 py-1 text-sm font-medium text-green-600 rounded-full bg-green-50">
                Available Now
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Fresh Chicken Delivery</h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              Premium quality chicken delivered fresh to your doorstep. Choose from our variety of cuts and sizes.
            </p>
            <div className="flex items-center justify-between">
              <Link
                to="/bookchicken"
                className="px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-500 to-green-600 rounded-2xl hover:from-green-600 hover:to-green-700 hover:shadow-xl"
              >
                Book Now →
              </Link>
              <div className="text-sm font-medium text-green-600">
                Next delivery: Today
              </div>
            </div>
          </div>

          {/* Orders Card */}
          {/* <div className="p-8 transition-all duration-500 border border-green-100 shadow-xl group bg-white/80 backdrop-blur-md rounded-3xl hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 transition-transform duration-300 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl group-hover:scale-110">
                <span className="text-3xl">🧾</span>
              </div>
              <div className="px-3 py-1 text-sm font-medium text-green-600 rounded-full bg-green-50">
                3 Active
              </div>
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Order Management</h2>
            <p className="mb-6 leading-relaxed text-gray-600">
              Track your orders, view delivery status, and manage your purchase history all in one place.
            </p>
            <div className="flex items-center justify-between">
              <a
                href="/orders"
                className="px-8 py-4 font-semibold text-green-600 transition-all duration-300 border border-green-200 bg-green-50 rounded-2xl hover:bg-green-100 hover:border-green-300"
              >
                View Orders →
              </a>
              <div className="text-sm font-medium text-green-600">
                Last order: 2 days ago
              </div>
            </div>
          </div> */}
        </div>

        {/* Recent Activity */}
        <div className="p-8 border border-green-100 shadow-xl bg-white/80 backdrop-blur-md rounded-3xl">
          <h3 className="mb-6 text-xl font-bold text-gray-800">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 space-x-4 bg-green-50 rounded-2xl">
              <div className="p-2 bg-green-100 rounded-full">
                <span className="text-lg">🚚</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1234 delivered</p>
                <p className="text-sm text-gray-600">2 kg whole chicken - 2 days ago</p>
              </div>
              <div className="font-medium text-green-600">✓ Completed</div>
            </div>
            
            <div className="flex items-center p-4 space-x-4 bg-yellow-50 rounded-2xl">
              <div className="p-2 bg-yellow-100 rounded-full">
                <span className="text-lg">📦</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1235 in transit</p>
                <p className="text-sm text-gray-600">1.5 kg chicken breast - Expected today</p>
              </div>
              <div className="font-medium text-yellow-600">🚚 In Transit</div>
            </div>
            
            <div className="flex items-center p-4 space-x-4 bg-blue-50 rounded-2xl">
              <div className="p-2 bg-blue-100 rounded-full">
                <span className="text-lg">📝</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Order #1236 confirmed</p>
                <p className="text-sm text-gray-600">3 kg mixed cuts - Processing</p>
              </div>
              <div className="font-medium text-blue-600">⏳ Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;