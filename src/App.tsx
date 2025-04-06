import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AppointmentPage from './components/AppointmentPage';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoggedIn) {
    // return <WelcomePage setIsLoggedIn={setIsLoggedIn} />;
    return <AppointmentPage/>
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TrustIndicators />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;