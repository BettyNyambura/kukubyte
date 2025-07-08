import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ChickensSection from './components/ChickensSection';
import HowItWorksSection from './components/Flow';
import AboutSection from './components/About';
import Footer from './components/Footer';
import SignupPage from '../src/components/pages/signup';
import LoginPage from '../src/components/pages/login'

const Home = () => (
  <>
    <HeroSection />
    <ChickensSection />
    <HowItWorksSection />
    <AboutSection />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="font-['Poppins'] bg-gray-50 min-h-screen w-full overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;