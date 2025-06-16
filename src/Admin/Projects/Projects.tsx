import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import AllProjects from './AllProjects';
import RejectedProjects from './RejectedProjects';
import CompletedProjects from './CompletedProject';
import PendingProjects from './PendingProjects';

const Projects: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('all')
  const [activePage, setActivePage] = useState<string>('all')
  const [isSearching, setIsSearching] = useState(false)

  const handleSetActive = (page: string) => {
    setActivePage(page)
    setStatus(page === 'all' ? 'all' : page)
  }

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 800)
  }

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'Completed', label: 'Completed' },
    { id: 'Pending', label: 'Pending' },
    { id: 'Rejected', label: 'Rejected' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Rejected', label: 'Rejected' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 md:p-6 lg:p-8 space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl md:text-3xl font-bold text-gray-800"
        >
          Project Management
        </motion.h1>
        
        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
        >
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex gap-3">
            <select
              name="status"
              aria-label="Filter by status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2ViY2FmZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.5rem] bg-[length:1rem]"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center min-w-[80px]"
            >
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Search'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex overflow-x-auto pb-2"
      >
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activePage === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleSetActive(tab.id)}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
        >
          {activePage === 'all' && <AllProjects searchTerm={search} statusFilter={status} />}
          {activePage === 'Completed' && <CompletedProjects searchTerm={search} />}
          {activePage === 'Rejected' && <RejectedProjects searchTerm={search} />}
          {activePage === 'Pending' && <PendingProjects searchTerm={search} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default Projects