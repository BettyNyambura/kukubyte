import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Welcome to Your Dashboard 🐔</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Booking Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-green-800 mb-3">📦 Book Chicken</h2>
          <p className="text-gray-700 mb-4">Need fresh chicken? Place your order now and we’ll deliver it to your doorstep.</p>
          <a
            href="/book"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Book Now
          </a>
        </div>

        {/* Orders Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-green-800 mb-3">🧾 My Orders</h2>
          <p className="text-gray-700 mb-4">View and track all your past and current chicken orders.</p>
          <a
            href="/orders"
            className="inline-block bg-green-100 text-green-700 px-6 py-3 rounded-full hover:bg-green-200 transition-colors"
          >
            View Orders
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
