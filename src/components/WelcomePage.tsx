import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Clock, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

// FAQ Data
const faqData = [
  {
    question: "How does online therapy work?",
    answer: "Our platform connects you with licensed therapists through secure video sessions. After signing up, you can browse therapist profiles, schedule appointments, and attend sessions from any device with internet access."
  },
  {
    question: "Is online therapy effective?",
    answer: "Research shows online therapy can be as effective as in-person therapy for many conditions including anxiety, depression, and stress management. Our therapists use the same evidence-based approaches they would in traditional settings."
  },
  {
    question: "How much does it cost?",
    answer: "We offer various subscription plans starting at $49/week. Many insurance providers cover our services, and we offer financial aid options for those who qualify."
  },
  {
    question: "Is my information private?",
    answer: "Absolutely. We use bank-level encryption for all communications, and our platform is fully HIPAA compliant. Your privacy and confidentiality are our top priorities."
  }
];

export default function PsychWebsite() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<"login" | "register" | null>(null);

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

  // Testimonials data
  const testimonials = [
    {
      text: "Psych transformed my approach to therapy. The convenience of connecting with my therapist from home has been life-changing.",
      author: "Sarah M."
    },
    {
      text: "After trying several platforms, Psych stands out for its intuitive interface and quality therapists. Highly recommend!",
      author: "David K."
    },
    {
      text: "The flexible scheduling makes it possible for me to prioritize mental health alongside my busy work schedule.",
      author: "Elena T."
    }
  ];

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll to section
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowMobileMenu(false);
  };

  // Toggle FAQ
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };


  // const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setModalOpen(null);
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
      <div id="features" ref={featuresRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-[#4A90E2]">Psych</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers everything you need for effective online therapy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg"
            >
              <div className="bg-[#4A90E2] inline-block p-3 rounded-lg mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Connect with Licensed Therapists</h3>
              <p className="text-gray-600">
                Access a network of verified mental health professionals from the comfort of your home.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg"
            >
              <div className="bg-[#4A90E2] inline-block p-3 rounded-lg mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Secure Video Sessions</h3>
              <p className="text-gray-600">
                Experience private, encrypted therapy sessions with complete peace of mind.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg"
            >
              <div className="bg-[#4A90E2] inline-block p-3 rounded-lg mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book appointments that fit your lifestyle, available 24/7.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-[#4A90E2]/10 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg absolute inset-0"
              >
                <div className="flex flex-col h-full justify-between">
                  <p className="text-xl italic text-gray-600 mb-8">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-right font-medium text-[#4A90E2]">— {testimonials[currentTestimonial].author}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-2 absolute bottom-0 left-0 right-0">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-[#4A90E2] w-8' : 'bg-[#4A90E2]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" ref={faqRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                key={index}
                className="mb-4"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  {activeQuestion === index ? 
                    <ChevronDown className="w-5 h-5 text-[#4A90E2]" /> : 
                    <ChevronRight className="w-5 h-5 text-[#4A90E2]" />
                  }
                </button>
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 border border-blue-100 rounded-b-lg">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#4A90E2] p-2 rounded-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Psych</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Your trusted partner for accessible mental health therapy online.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">How It Works</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Our Therapists</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Reviews</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#4A90E2] transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Psych. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {modalOpen === "login" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Login</h3>
                <button onClick={() => setModalOpen(null)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#4A90E2] hover:underline">Forgot password?</a>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#4A90E2] text-white py-3 rounded-lg hover:bg-[#357ABD] transition-all font-medium"
                >
                  Login
                </motion.button>
                <p className="text-center text-gray-600 text-sm mt-4">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setModalOpen("register")}
                    className="text-[#4A90E2] hover:underline font-medium"
                  >
                    Register
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Register Modal */}
      <AnimatePresence>
        {modalOpen === "register" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Create Account</h3>
                <button 
                  onClick={() => setModalOpen(null)}
                  className="hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create Account
                  </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setModalOpen("login")}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  )}