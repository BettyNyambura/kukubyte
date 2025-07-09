import { Link } from 'react-router-dom';
import React from 'react';

const Confirmation = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-xl text-center border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been received and is being processed. You will receive a message from our delivery agent.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;