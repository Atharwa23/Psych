import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Clock, Menu, X } from 'lucide-react';
import Questionnaire from '../components/Questionnaire';
import Login from '../components/Login'
import Register from '../components/Register'
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import FeaturesSection from '../components/Features';

type WelcomePageProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PsychWebsite({setIsLoggedIn} : WelcomePageProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [userId, setUserId] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState<"register" | "questionnaire" | "login" | null>(null);

  // References for scroll
  const homeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  // Observer for scroll sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (homeRef.current) observer.observe(homeRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);


  // Scroll to section
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowMobileMenu(false);
  };

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-[#4A90E2] p-2 rounded-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#4A90E2]">Psych</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 mr-6">
              <li>
                <button 
                  onClick={() => scrollToSection(homeRef)}
                  className={`${activeSection === "home" ? "text-[#4A90E2] font-medium" : "text-gray-600 hover:text-[#4A90E2]"} transition-colors`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(featuresRef)}
                  className={`${activeSection === "features" ? "text-[#4A90E2] font-medium" : "text-gray-600 hover:text-[#4A90E2]"} transition-colors`}
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection(faqRef)}
                  className={`${activeSection === "faq" ? "text-[#4A90E2] font-medium" : "text-gray-600 hover:text-[#4A90E2]"} transition-colors`}
                >
                  FAQ
                </button>
              </li>
            </ul>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalOpen("login")}
                className="px-4 py-2 text-[#4A90E2] border border-[#4A90E2] rounded-lg hover:bg-blue-50 transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalOpen("register")}
                className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
              >
                Register
              </motion.button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? 
                <X className="w-6 h-6 text-gray-700" /> : 
                <Menu className="w-6 h-6 text-gray-700" />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col">
                <ul className="flex flex-col space-y-3 mb-4">
                  <li>
                    <button 
                      onClick={() => scrollToSection(homeRef)}
                      className="text-gray-600 hover:text-[#4A90E2] transition-colors w-full text-left"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection(featuresRef)}
                      className="text-gray-600 hover:text-[#4A90E2] transition-colors w-full text-left"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection(faqRef)}
                      className="text-gray-600 hover:text-[#4A90E2] transition-colors w-full text-left"
                    >
                      FAQ
                    </button>
                  </li>
                </ul>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setModalOpen("login")}
                    className="px-4 py-2 text-[#4A90E2] border border-[#4A90E2] rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setModalOpen("register")}
                    className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
                  >
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <div
  id="home"
  ref={homeRef}
  className="min-h-screen pt-24 pb-32 md:pt-32 flex items-center"
>
  <div className="container mx-auto px-4">
    <div className="flex justify-center w-full">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-2/3 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Mental Health{" "}<br></br>
          <span className="text-[#4A90E2]">Matters ! </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Every Suicide Every Harm to Human Life Shouts that your Mental Health Matters!<br></br>
          Join Us!
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen("register")}
            className="px-8 py-3 bg-[#4A90E2] text-white rounded-lg shadow-lg hover:bg-[#357ABD] transition-all font-medium"
          >
            Get Started Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(featuresRef)}
            className="px-8 py-3 border border-[#4A90E2] text-[#4A90E2] rounded-lg hover:bg-blue-50 transition-all font-medium"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
</div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ ref={faqRef} />

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-[#4A90E2]/20 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands who've transformed their lives with Psych's online therapy platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen("register")}
              className="px-8 py-4 bg-[#4A90E2] text-white rounded-lg shadow-xl hover:bg-[#357ABD] transition-all font-medium text-lg"
            >
              Create Your Account
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Login Modal */}
      <AnimatePresence>{modalOpen === "login" && <Login setModalOpen={setModalOpen} setIsLoggedIn={setIsLoggedIn} setUserId={setUserId}/>}</AnimatePresence>
      {/* Register Modal */}
      <AnimatePresence>{modalOpen === "register" && <Register setModalOpen={setModalOpen} setUserId={setUserId}/>}</AnimatePresence>
      {/* Questionnaire Modal */}
      <AnimatePresence>{modalOpen === "questionnaire" && <Questionnaire setModalOpen={setModalOpen} setIsLoggedIn={setIsLoggedIn} userId={userId}/>}</AnimatePresence>
      </div>
  )}