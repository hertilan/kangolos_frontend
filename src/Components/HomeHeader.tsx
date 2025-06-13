import React from 'react'
import { Link } from 'react-router-dom'
import universityLogo from '../assets/project.png';

const HomeHeader: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-white z-50 text-gray-600 shadow-sm overflow-hidden 
      before:content-[''] before:absolute before:inset-0 before:bg-indigo-500 
      before:origin-top before:scale-y-0 before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-y-100 before:pointer-events-none group">
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <img src={universityLogo} alt="University Logo" className="h-10" />
          <span className="text-xl font-bold text-indigo-800 group-hover:text-white transition-colors duration-300">
            ProjectFlow
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/features" 
            className="hover:text-indigo-600 group-hover:text-white transition-colors duration-300"
          >
            Features
          </Link>
          <Link 
            to="/how-it-works" 
            className="hover:text-indigo-600 group-hover:text-white transition-colors duration-300"
          >
            How It Works
          </Link>
          <Link 
            to="/resources" 
            className="hover:text-indigo-600 group-hover:text-white transition-colors duration-300"
          >
            Resources
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-indigo-600 group-hover:text-white transition-colors duration-300"
          >
            Contact
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg 
                hover:bg-indigo-50 group-hover:border-white group-hover:text-white transition-colors duration-300"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                hover:bg-indigo-700 shadow-md group-hover:bg-white group-hover:text-indigo-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
        
        {/* Mobile menu button would go here */}
      </div>
    </nav>
  )
}

export default HomeHeader