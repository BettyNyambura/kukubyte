import React from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders') // Update with your backend URL
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">📋 My Orders</h1>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders placed yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-green-800 border-b border-gray-200">
                <th className="py-2">#</th>
                <th>Kilograms</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id} className="text-gray-700 border-b border-gray-100">
                  <td className="py-3">{i + 1}</td>
                  <td>{order.kgs} kg</td>
                  <td>{order.location}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
