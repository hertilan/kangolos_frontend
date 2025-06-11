import React from 'react'
import { Link } from 'react-router-dom'
import universityLogo from '../assets/project.png';

const HomeHeader :React.FC= () => {
  return (
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
  )
}

export default HomeHeader
