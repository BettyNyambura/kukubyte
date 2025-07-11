import React from 'react';

const AboutSection = () => {
  return (
    <section
      id="about"
      className="pt-32 pb-20 bg-white w-screen overflow-x-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-8">
          👩‍🌾 About Me
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a poultry farmer based in Kikuyu Area, Nairobi, Kenya. This site helps me connect directly with customers. I rear healthy chicken, and I give them more time to mature compared to the normal maturity period within my locality.  
          </p>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Why Choose Us?</h3>
            <ul className="text-gray-700 space-y-2">
              <li>🌱 Farm-fresh, naturally raised chickens</li>
              <li>🚚 Direct delivery to your doorstep</li>
              <li>💰 Fair prices with no middlemen</li>
              <li>🤝 Personal service from a local farmer</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;