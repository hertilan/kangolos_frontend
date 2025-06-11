import React from 'react';
import { FaArrowRight, FaChartLine, FaSearch, FaUsers, FaFileAlt, FaComments, FaUniversity } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import heroImage from '../assets/project.png'; // Replace with your actual image
import feature1 from '../assets/project.png';
import feature2 from '../assets/project.png';
import feature3 from '../assets/project.png';
import testimonial1 from '../assets/project.png';
import testimonial2 from '../assets/project.png';
import universityLogo from '../assets/project.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Modern Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={universityLogo} alt="University Logo" className="h-10" />
            <span className="text-xl font-bold text-indigo-800">ProjectFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-indigo-600 transition">Features</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</Link>
            <Link to="/resources" className="text-gray-600 hover:text-indigo-600 transition">Resources</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition">Contact</Link>
            
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button would go here */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
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
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-xl bg-indigo-50">
              <div className="text-4xl font-bold text-indigo-600 mb-2">1,200+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="p-8 rounded-xl bg-blue-50">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Submission Rate</div>
            </div>
            <div className="p-8 rounded-xl bg-purple-50">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Student Satisfaction</div>
            </div>
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

      {/* Testimonials */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who have successfully used ProjectFlow for their final year projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <img src={testimonial1} alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Alice Uwase</h4>
                  <p className="text-gray-600 text-sm">Computer Science, 2023</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "ProjectFlow made managing my final year project so much easier. The submission process was seamless, and I could easily track all feedback from my supervisor in one place."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-6">
                <img src={testimonial2} alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">John Mugisha</h4>
                  <p className="text-gray-600 text-sm">Electrical Engineering, 2023</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As someone who struggled with organization, ProjectFlow was a game-changer. The progress tracking features helped me stay on top of deadlines and deliverables throughout my project."
              </p>
            </div>
          </div>
        </div>
      </section>

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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={universityLogo} alt="University Logo" className="h-8" />
                <span className="text-xl font-bold">ProjectFlow</span>
              </div>
              <p className="text-gray-400">
                The official project management system for University of Rwanda students.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition">How It Works</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white transition">Resources</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                <li><Link to="/feedback" className="text-gray-400 hover:text-white transition">Feedback</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <Link to="#" className="text-gray-400 hover:text-white transition">Twitter</Link>
                <Link to="#" className="text-gray-400 hover:text-white transition">Facebook</Link>
                <Link to="#" className="text-gray-400 hover:text-white transition">LinkedIn</Link>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">Email: support@projectflow.edu.rw</p>
                <p className="text-gray-400">Phone: +250 123 456 789</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} ProjectFlow - University of Rwanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;