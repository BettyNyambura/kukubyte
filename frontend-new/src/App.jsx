import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ChickensSection from './components/ChickensSection';
import HowItWorksSection from './components/Flow';
import AboutSection from './components/About';
import Footer from './components/Footer';
import SignupPage from './components/pages/signup';
import LoginPage from './components/pages/login';
import Dashboard from './components/pages/dashboard';
import BookChicken from './components/pages/bookchicken';

const Home = () => (
  <>
    <HeroSection />
    <ChickensSection />
    <HowItWorksSection />
    <AboutSection />
    <Footer />
  </>
);

// Layout wrapper to hide Header on specific routes
const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ['/dashboard', '/bookchicken'];

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookchicken" element={<BookChicken />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
