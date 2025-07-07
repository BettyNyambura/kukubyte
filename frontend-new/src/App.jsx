import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ChickensSection from './components/ChickensSection';
import HowItWorksSection from './components/Flow';
import AboutSection from './components/About';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="font-['Poppins'] bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <ChickensSection />
      <HowItWorksSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default App;