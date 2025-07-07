import React from 'react';

// Work Step Component
const WorkStep = ({ number, title, description }) => {
  return (
    <div className="text-center group">
      <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg group-hover:bg-green-700 transition-colors">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main How It Works Section
const HowItWorksSection = () => {
  const steps = [
    { number: 1, title: "Sign Up", description: "Create an account to start booking." },
    { number: 2, title: "Select Chicken", description: "Choose your preferred chicken type." },
    { number: 3, title: "Choose Location", description: "Specify your delivery location." },
    { number: 4, title: "Wait for Delivery", description: "Get confirmation and enjoy fresh chicken!" }
  ];

  return (
    <section id="how-it-works" className="bg-green-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          📦 How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <WorkStep 
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;