import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import universityLogo from '../assets/project.png';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Signup from './Signup';

interface HomeHeaderProps {
  isScrolledDown: boolean;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ isScrolledDown }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Principal', path: '/principal/' },
    { name: 'Dean', path: '/deen/' },
    { name: 'HOD', path: '/hod/' },
    { name: 'Supervisor', path: '/supervisor/' },
    { name: 'Student', path: '/student/' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <>
      <nav className={`sticky top-0 z-40 shadow-sm overflow-hidden bg-white
        before:content-[''] before:absolute before:inset-0 before:bg-indigo-600 
        before:origin-top before:scale-y-0 before:transition-transform before:duration-500 before:ease-in-out
        before:pointer-events-none ${isScrolledDown ? 'before:scale-y-100' : ''}`}>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <img 
                src={universityLogo} 
                alt="University Logo" 
                className="h-8 sm:h-10 transition-all duration-300 hover:scale-105" 
              />
              <span className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                isScrolledDown ? 'text-white' : 'text-indigo-800'
              }`}>
                Kangalos
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      isScrolledDown
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-gray-700 hover:text-indigo-700 hover:bg-indigo-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center space-x-2 ml-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${
                      isScrolledDown
                        ? 'border-white text-white hover:bg-white hover:text-indigo-600'
                        : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    Login
                  </button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isScrolledDown
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    } shadow-md hover:shadow-lg`}
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <FiX className={`h-6 w-6 ${isScrolledDown ? 'text-white' : 'text-indigo-700'}`} />
              ) : (
                <FiMenu className={`h-6 w-6 ${isScrolledDown ? 'text-white' : 'text-indigo-700'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden overflow-hidden ${isScrolledDown ? 'bg-indigo-600/95' : 'bg-white/95'} backdrop-blur-sm`}
            >
              <div className="px-2 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                        isScrolledDown
                          ? 'text-white/90 hover:bg-white/10'
                          : 'text-gray-800 hover:bg-indigo-50'
                      }`}
                      onClick={toggleMobileMenu}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-2 space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-center rounded-lg border font-medium transition-colors duration-300 ${
                        isScrolledDown
                          ? 'border-white text-white hover:bg-white hover:text-indigo-600'
                          : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      Login
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        setIsSignupOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-center rounded-lg font-medium shadow-md transition-colors duration-300 ${
                        isScrolledDown
                          ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      Get Started
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSignupClick={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />

      <Signup 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onLoginClick={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default HomeHeader;