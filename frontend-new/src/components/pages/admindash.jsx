import React, { useState, useEffect } from 'react';
import logo from './images/logo.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    checkAdmin();
    fetchAdminData();
  }, []);

  const checkAdmin = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/auth/is_admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {
      navigate('/dashboard');
    }
  };

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const [userRes, ordersRes, stocksRes] = await Promise.all([
        axios.get('http://127.0.0.1:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://127.0.0.1:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://127.0.0.1:5000/api/admin/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);
      setUser(userRes.data);
      setOrders(ordersRes.data);
      setStocks(stocksRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('access_token');
    await axios.delete(`http://127.0.0.1:5000/api/admin/stocks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStocks(stocks.filter(s => s.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold text-green-700">Admin Dashboard</h1>
        </div>
        <div>
          <p className="text-sm text-gray-600">Logged in as: <span className="font-semibold">{user?.username}</span></p>
          <button onClick={handleLogout} className="ml-4 bg-red-600 text-white px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">All Orders</h2>
          {orders.length > 0 ? orders.map(order => (
            <div key={order.id} className="border-b py-2">
              <p><strong>User:</strong> {order.username}</p>
              <p><strong>Quantity:</strong> {order.quantity} • {order.location}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          )) : <p>No orders found</p>}
        </div>

        {/* Stock Control */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Manage Stock</h2>
          {stocks.length > 0 ? stocks.map(stock => (
            <div key={stock.id} className="flex justify-between items-center border-b py-2">
              <p>{stock.weight} kg — {stock.stock} chickens</p>
              <button onClick={() => handleDelete(stock.id)} className="text-red-600 text-sm">Delete</button>
            </div>
          )) : <p>No stock records found</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
