import React from 'react'
import { 
  FiBell,
  FiSearch,
  FiChevronDown
} from 'react-icons/fi';

const Header :React.FC= () => {
  return (
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
            <FiSearch className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search students, projects..." 
              className="bg-transparent border-none focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              {/* Notification dropdown would go here */}
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                SP
              </div>
              <span className="ml-2 text-gray-700">Supervisor</span>
              <FiChevronDown className="ml-1 text-gray-500" />
            </div>
          </div>
        </header>
  )
}

export default Header
