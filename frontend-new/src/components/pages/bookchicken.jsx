import React, { useState } from 'react';

const BookChicken = () => {
  const [kgs, setKgs] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the booking logic here
    console.log('Booking:', { kgs, location });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">🐔 Book Chicken</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Number of Kilograms</label>
          <input
            type="number"
            value={kgs}
            onChange={(e) => setKgs(e.target.value)}
            required
            min="1"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. 3"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Delivery Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Nairobi, Kenya"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default BookChicken;
