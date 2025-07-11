import React, { useState, useEffect } from 'react';
import logo from './images/logo.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newStock, setNewStock] = useState({ weight: '', stock: '', chicken_id: '' });
  const [updateStock, setUpdateStock] = useState({ id: null, quantity: '' });

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
      await axios.get('http://127.0.0.1:5000/api/auth/is_admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch {
      navigate('/dashboard');
    }
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const [userRes, ordersRes, stocksRes, usersRes] = await Promise.all([
        axios.get('http://127.0.0.1:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://127.0.0.1:5000/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://127.0.0.1:5000/api/admin/stocks', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://127.0.0.1:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);
      setUser(userRes.data);
      setOrders(ordersRes.data);
      setStocks(stocksRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await axios.post(
        'http://127.0.0.1:5000/api/admin/stocks',
        newStock,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStocks([...stocks, res.data]);
      setNewStock({ weight: '', stock: '', chicken_id: '' });
      setSuccessMessage('Stock added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add stock');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (stockId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(
        `http://127.0.0.1:5000/api/admin/stocks/${stockId}`,
        { stock: parseInt(updateStock.quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStocks(
        stocks.map((s) =>
          s.id === stockId ? { ...s, stock: parseInt(updateStock.quantity) } : s
        )
      );
      setUpdateStock({ id: null, quantity: '' });
      setSuccessMessage('Stock updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update stock');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStock = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5000/api/admin/stocks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStocks(stocks.filter((s) => s.id !== id));
      setSuccessMessage('Stock deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete stock');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(
        `http://127.0.0.1:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSuccessMessage('Order status updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-24 h-24" />
          <h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Logged in as: <span className="font-semibold">{user?.username}</span>
          </p>
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Orders */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">All Orders</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border-b py-4">
                <p>
                  <strong>User:</strong> {order.username}
                </p>
                <p>
                  <strong>Chicken:</strong> {order.chicken_name}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity} •{' '}
                  <strong>Weight:</strong> {order.weight ? `${order.weight} kg` : 'Not specified'} •{' '}
                  <strong>Location:</strong> {order.location}
                </p>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {new Date(order.order_date).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateOrderStatus(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                    disabled={loading}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>

        {/* Stock Control */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Manage Stock</h2>
          {/* Add Stock Form */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Add New Stock</h3>
            <form onSubmit={handleAddStock} className="flex space-x-4">
              <select
                value={newStock.chicken_id}
                onChange={(e) => setNewStock({ ...newStock, chicken_id: e.target.value })}
                className="border rounded px-2 py-1 text-sm w-1/3"
                required
              >
                <option value="">Select Chicken</option>
                {[...new Set(stocks.map(s => s.chicken_id))].map(chicken_id => {
                  const stock = stocks.find(s => s.chicken_id === chicken_id);
                  return (
                    <option key={chicken_id} value={chicken_id}>
                      {stock.chicken_name}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                step="0.1"
                placeholder="Weight (kg)"
                value={newStock.weight}
                onChange={(e) => setNewStock({ ...newStock, weight: e.target.value })}
                className="border rounded px-2 py-1 text-sm w-1/3"
                required
              />
              <input
                type="number"
                placeholder="Stock (chickens)"
                value={newStock.stock}
                onChange={(e) => setNewStock({ ...newStock, stock: e.target.value })}
                className="border rounded px-2 py-1 text-sm w-1/3"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                disabled={loading}
              >
                Add Stock
              </button>
            </form>
          </div>
          {/* Stock List */}
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <div
                key={stock.id}
                className="flex justify-between items-center border-b py-4"
              >
                <p>
                  {stock.chicken_name} • {stock.weight} kg • {stock.stock} chickens
                </p>
                <div className="flex items-center space-x-2">
                  {updateStock.id === stock.id ? (
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="New stock"
                        value={updateStock.quantity}
                        onChange={(e) =>
                          setUpdateStock({
                            ...updateStock,
                            quantity: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 text-sm w-24"
                        required
                      />
                      <button
                        onClick={() => handleUpdateStock(stock.id)}
                        className="text-blue-600 text-sm hover:text-blue-800"
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setUpdateStock({ id: null, quantity: '' })}
                        className="text-gray-600 text-sm hover:text-gray-800"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setUpdateStock({ id: stock.id, quantity: stock.stock })
                        }
                        className="text-blue-600 text-sm hover:text-blue-800"
                        disabled={loading}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteStock(stock.id)}
                        className="text-red-600 text-sm hover:text-red-800"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No stock records found</p>
          )}
        </div>

        {/* Users */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">All Users</h2>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="border-b py-4">
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;