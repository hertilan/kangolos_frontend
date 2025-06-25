import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaChartLine, FaFileAlt, FaComments } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import heroImage from '../assets/discussion.png'; // Replace with your actual image
import feature1 from '../assets/ai1.png';
import feature2 from '../assets/ai2.png';
import feature3 from '../assets/ai3.png';
import Footer from './Footer';
import HomeHeader from './HomeHeader';
import Testimonial from './Testimonial';
import CompletedProjects from './CompletedProjects';
import SubmissionRate from './SubmissionRate';
import StudentSatsfaction from './StudentSatsfaction';
import { motion } from 'framer-motion';
import Login from './RealLogin';
import Signup from './Signup';

const Home: React.FC = () => {
  // State for tracking scroll position to modify header behavior
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  
  // State for controlling authentication modals
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState<boolean>(false);

  // Effect for handling scroll events and modifying header appearance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > prevScrollY && currentScrollY > 50) {
        // Scrolling down past 50px threshold
        setIsScrolledDown(true);
      } else if (currentScrollY < prevScrollY || currentScrollY <= 50) {
        // Scrolling up or near top of page
        setIsScrolledDown(false);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  /**
   * Handles opening the signup modal and closing any other open auth modals
   */
  const handleSignupOpen = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  /**
   * Handles opening the login modal and closing any other open auth modals
   */
  const handleLoginOpen = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Modern Navbar */}
      <HomeHeader 
        isScrolledDown={isScrolledDown} 
        onClose={handleLoginOpen}
        showSignup={handleSignupOpen}
      />
      
      {/* Authentication Modals */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/75 bg-opacity-50 p-4"
        >
          <Login 
            onClose={() => setShowLogin(false)} 
            showSignup={() => {
              setShowLogin(false);
              handleSignupOpen();
            }}
          />
        </motion.div>
      )}
      
      {showSignup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/75 bg-opacity-50 p-4"
        >
          <Signup 
            onClose={() => setShowSignup(false)} 
            showLogin={() => {
              setShowSignup(false);
              handleLoginOpen();
            }}
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className='w-full'>
        {/* Hero Section */}
        <section 
          className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 
                id="hero-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Streamline Your <span className="text-indigo-600">Academic Projects</span> with Ease
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                
                The comprehensive platform for University of Rwanda students to submit, manage, 
                and showcase final year projects with seamless collaboration between students 
                and supervisors.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleSignupOpen}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Get started with ProjectFlow"
                >
                  Start Your Project <FaArrowRight className="ml-2" />
                </button>
                <Link 
                  to="/how-it-works" 
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Learn how ProjectFlow works"
                >
                  See How It Works
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src={heroImage} 
                alt="Students collaborating on a project" 
                className="w-full max-w-md rounded-lg shadow-md"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section 
          className="py-16 bg-white px-4 sm:px-6 lg:px-8"
          aria-labelledby="stats-heading"
        >
          <div className="container mx-auto">
            <h2 id="stats-heading" className="sr-only">Project statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <CompletedProjects />
              <SubmissionRate />
              <StudentSatsfaction />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Powerful Features for Academic Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your final year project from start to finish
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: Project Submission */}
              <article className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FaFileAlt className="text-indigo-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Project Submission</h3>
                <p className="text-gray-600 mb-4">
                  Easily submit your final project with all required documentation in one place.
                  Our system validates your files and ensures all requirements are met.
                </p>
                <Link 
                  to="/features/submission" 
                  className="text-indigo-600 flex items-center hover:text-indigo-800 transition"
                  aria-label="Learn more about project submission"
                >
                  Learn more <FiExternalLink className="ml-1" aria-hidden="true" />
                </Link>
              </article>
              
              {/* Feature 2: Progress Tracking */}
              <article className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FaChartLine className="text-blue-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Monitor your project milestones and deadlines with our intuitive dashboard.
                  Get automated reminders and visual progress indicators.
                </p>
                <Link 
                  to="/features/tracking" 
                  className="text-blue-600 flex items-center hover:text-blue-800 transition"
                  aria-label="Learn more about progress tracking"
                >
                  Learn more <FiExternalLink className="ml-1" aria-hidden="true" />
                </Link>
              </article>
              
              {/* Feature 3: Supervisor Feedback */}
              <article className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <FaComments className="text-purple-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Supervisor Feedback</h3>
                <p className="text-gray-600 mb-4">
                  Receive timely feedback and communicate directly with your supervisor.
                  Track feedback history and implement changes efficiently.
                </p>
                <Link 
                  to="/features/feedback" 
                  className="text-purple-600 flex items-center hover:text-purple-800 transition"
                  aria-label="Learn more about supervisor feedback"
                >
                  Learn more <FiExternalLink className="ml-1" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section 
          className="py-20 bg-white px-4 sm:px-6 lg:px-8"
          aria-labelledby="how-it-works-heading"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 id="how-it-works-heading" className="text-3xl font-bold text-gray-900 mb-4">
                How ProjectFlow Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A simple three-step process to manage your academic projects effectively
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <article className="flex flex-col items-center text-center">
                <div 
                  className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  aria-hidden="true"
                >
                  <span className="text-indigo-600 font-bold text-xl">1</span>
                </div>
                <img 
                  src={feature1} 
                  alt="Create project interface" 
                  className="w-48 mb-6 rounded-lg shadow-sm"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-3">Create Your Project</h3>
                <p className="text-gray-600">
                  Set up your project profile with all necessary details, documentation,
                  and team members in our intuitive dashboard.
                </p>
              </article>
              
              {/* Step 2 */}
              <article className="flex flex-col items-center text-center">
                <div 
                  className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  aria-hidden="true"
                >
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <img 
                  src={feature2} 
                  alt="Progress tracking interface" 
                  className="w-48 mb-6 rounded-lg shadow-sm"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-gray-600">
                  Monitor milestones, deadlines, and receive notifications for important
                  updates from your supervisor and team members.
                </p>
              </article>
              
              {/* Step 3 */}
              <article className="flex flex-col items-center text-center">
                <div 
                  className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  aria-hidden="true"
                >
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <img 
                  src={feature3} 
                  alt="Project submission interface" 
                  className="w-48 mb-6 rounded-lg shadow-sm"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-3">Submit & Showcase</h3>
                <p className="text-gray-600">
                  Finalize your submission, get approval from your supervisor, and add it
                  to the university's project repository for future reference.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonial />

        {/* CTA Section */}
        <section 
          className="py-20 bg-indigo-600 text-white px-4 sm:px-6 lg:px-8"
          aria-labelledby="cta-heading"
        >
          <div className="container mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-bold mb-6">
              Ready to Elevate Your Project Experience?
            </h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
              Join hundreds of University of Rwanda students who are already managing their
              projects efficiently with ProjectFlow. Start your journey today!
            </p>
            <button 
              onClick={handleSignupOpen}
              className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              aria-label="Get started with ProjectFlow"
            >
              Get Started for Free
            </button>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;