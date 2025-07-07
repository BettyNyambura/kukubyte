import React from 'react';

// Chicken Card Component
const ChickenCard = ({ name, price, weight }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-gray-100">
      <div className="text-4xl mb-4">🐔</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name} {weight}</h3>
      <p className="text-2xl font-bold text-green-600 mb-4">KES {price}</p>
      <a 
        href="#signup" 
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
      >
        Order Now
      </a>
    </div>
  );
};

// Main Chickens Section
const ChickensSection = () => {
  const chickens = [
    { name: "Broiler", weight: "2kg", price: "800" },
    { name: "Kienyeji", weight: "1.5kg", price: "700" }
  ];

  return (
    <section id="chickens" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          🐔 Chickens Available
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {chickens.map((chicken, index) => (
            <ChickenCard 
              key={index}
              name={chicken.name}
              weight={chicken.weight}
              price={chicken.price}
            />
          ))}
        </div>
        <p className="text-center mt-8 text-gray-600 text-lg">
          Sign up to place your order today!
        </p>
      </div>
    </section>
  );
};

export default ChickensSection;