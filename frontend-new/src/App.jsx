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
import Confirmation from './components/pages/confirmation';
import AdminDashboard from './components/pages/admindash';

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
function Layout({ children }) {
  const location = useLocation();
  const noHeaderRoutes = ['/dashboard', '/bookchicken', '/confirmation', '/admindash'];

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      {children}
    </div>
  );
}

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
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admindash" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
