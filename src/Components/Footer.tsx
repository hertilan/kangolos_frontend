import React from 'react'
import { Link } from 'react-router-dom'
import universityLogo from '../assets/project.png';

const Footer :React.FC= () => {
  return (
      <footer className="bg-gray-900 text-white py-12 px-10">
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
            <p>© {new Date().getFullYear()} Kangalos - University of Rwanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
export default Footer
