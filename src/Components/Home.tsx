import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaChartLine, FaFileAlt, FaComments } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import heroImage from '../assets/project.png'; // Replace with your actual image
import feature1 from '../assets/project.png';
import feature2 from '../assets/project.png';
import feature3 from '../assets/project.png';
import Footer from './Footer';
import HomeHeader from './HomeHeader';
import Testimonial from './Testimonial';
import CompletedProjects from './CompletedProjects';
import SubmissionRate from './SubmissionRate';
import StudentSatsfaction from './StudentSatsfaction';


const Home: React.FC = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

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



  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Modern Navbar */}
      <HomeHeader isScrolledDown={isScrolledDown} />

      {/* Hero Section */}
      <div className='w-full '>
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20 px-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your <span className="text-indigo-600">Academic Projects</span> with Ease
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              The comprehensive platform for University of Rwanda students to submit, manage, and showcase final year projects with seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg flex items-center justify-center"
              >
                Start Your Project <FaArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-indigo-700 transition-all duration-700 ease-ease-out flex items-center hover:text-gray-100 justify-center"
              >
                See How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={heroImage} 
              alt="Students collaborating" 
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white px-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <CompletedProjects/>
            <SubmissionRate/>
            <StudentSatsfaction/>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for Academic Success</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your final year project from start to finish
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FaFileAlt className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Project Submission</h3>
              <p className="text-gray-600 mb-4">
                Easily submit your final project with all required documentation in one place.
              </p>
              <Link to="/features/submission" className="text-indigo-600 flex items-center">
                Learn more <FiExternalLink className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FaChartLine className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600 mb-4">
                Monitor your project milestones and deadlines with our intuitive dashboard.
              </p>
              <Link to="/features/tracking" className="text-blue-600 flex items-center">
                Learn more <FiExternalLink className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <FaComments className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Supervisor Feedback</h3>
              <p className="text-gray-600 mb-4">
                Receive timely feedback and communicate directly with your supervisor.
              </p>
              <Link to="/features/feedback" className="text-purple-600 flex items-center">
                Learn more <FiExternalLink className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ProjectFlow Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to manage your academic projects effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <span className="text-indigo-600 font-bold text-xl">1</span>
              </div>
              <img src={feature1} alt="Step 1" className="w-48 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Create Your Project</h3>
              <p className="text-gray-600">
                Set up your project profile with all necessary details and documentation.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <img src={feature2} alt="Step 2" className="w-48 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor milestones, deadlines, and receive notifications for important updates.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <img src={feature3} alt="Step 3" className="w-48 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Submit & Showcase</h3>
              <p className="text-gray-600">
                Finalize your submission and add it to the university's project repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonial/>
      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Project Experience?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Join hundreds of University of Rwanda students who are already managing their projects efficiently with ProjectFlow.
          </p>
          <Link 
            to="/signup" 
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition shadow-lg font-medium"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
    </div>
  );
};

export default Home;