import React, { useState, useEffect } from 'react';
import logo from './images/logo.jpg'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chickens, setChickens] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_orders: 0,
    this_month_orders: 0,
    total_saved: 0,
    active_orders: 0,
    recent_orders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserProfile();
    fetchChickens();
    fetchDashboardStats();
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

  const fetchChickens = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/chickens/');
      setChickens(response.data);
    } catch (error) {
      console.error('Error fetching chickens:', error);
      setError('Failed to load chicken data');
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:5000/api/auth/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const handleBookChicken = () => {
    navigate('/bookchicken');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-full mx-auto px-6 py-6">
=======
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b border-green-100 bg-white/80 backdrop-blur-md">
        <div className="px-6 py-6 mx-auto max-w-7xl">
>>>>>>> aba9e4e5dd12ebfc585cadd2fa9515189763254b
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
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Logged in as: <span className="font-medium text-gray-900">{user?.username || 'Loading...'}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.total_orders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Chickens ordered</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.total_chickens_ordered}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-semibold text-gray-900">${dashboardStats.total_spent?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-50 rounded-lg">
                <div className="w-6 h-6 bg-orange-600 rounded"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.active_orders}</p>
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Chickens */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Available Chickens</h2>
                <button
                  onClick={handleBookChicken}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Book Chicken
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {chickens.length > 0 ? (
                  chickens.map((chicken) => (
                    <div key={chicken.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{chicken.name}</h3>
                        <p className="text-sm text-gray-600">{chicken.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${chicken.price}/kg</p>
                        <p className="text-sm text-gray-600">
                          {chicken.total_chickens} chickens • {chicken.total_weight} kg available
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No chickens available at the moment</p>
                  </div>
                )}
=======
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
>>>>>>> aba9e4e5dd12ebfc585cadd2fa9515189763254b
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardStats.recent_orders.length > 0 ? (
                  dashboardStats.recent_orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{order.chicken.name}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(order.order_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{dashboardStats.total_chickens_ordered} Pieces</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recent orders</p>
                  </div>
                )}
              </div>
            </div>
=======
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
>>>>>>> aba9e4e5dd12ebfc585cadd2fa9515189763254b
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;