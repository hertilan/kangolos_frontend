import React from 'react';
import { Link } from 'react-router-dom';
import universityLogo from '../assets/project.png';

interface HomeHeaderProps {
  isScrolledDown: boolean;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ isScrolledDown }) => {
  return (
    <nav className={`sticky top-0 z-50 bg-white text-gray-600 shadow-sm overflow-hidden 
      before:content-[''] before:absolute before:inset-0 before:bg-indigo-500 
      before:origin-top before:scale-y-0 before:transition-transform before:duration-500 before:ease-in-out
      before:pointer-events-none ${isScrolledDown ? 'before:scale-y-100' : ''}`}>
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <img src={universityLogo} alt="University Logo" className="h-10" />
          <span className={`text-xl font-bold ${isScrolledDown ? 'text-white' : 'text-indigo-800'} transition-colors duration-300`}>
            ProjectFlow
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/principal/" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}>
            Principal
          </Link>
          <Link 
            to="/deen/" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}>
            Deen
          </Link>
          <Link 
            to="/hod/" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}>
            Hod
          </Link>
          <Link 
            to="/supervisor/" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}
          >
            supervisor
          </Link>
          <Link 
            to="/student/" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}
          >
            Student
          </Link>
          <Link 
            to="/admin" 
            className={`${isScrolledDown ? 'text-white' : 'text-gray-600 hover:text-indigo-600'} transition-colors duration-300`}
          >
            Admin
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                isScrolledDown 
                  ? 'border-white text-white hover:bg-white hover:text-indigo-600'
                  : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className={`px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ${
                isScrolledDown
                  ? 'bg-white text-indigo-600 hover:bg-indigo-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;