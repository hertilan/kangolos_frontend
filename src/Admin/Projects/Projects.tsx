import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import AllProjects from './AllProjects';
import RejectedProjects from './RejectedProjects';
import CompletedProjects from './CompletedProject';
import PendingProjects from './PendingProjects';

const Projects: React.FC = () => {
  const [status, setStatus] = useState<string>('all')
  const [activePage, setActivePage] = useState<string>('all')

  const handleSetActive = (page: string) => {
    setActivePage(page)
    setStatus(page === 'all' ? 'all' : page)
  }


  const tabs = [
    { id: 'all', label: 'All Projects' },
    // { id: 'Completed', label: 'Completed' },
    // { id: 'Pending', label: 'Pending' },
    // { id: 'Rejected', label: 'Rejected' }
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
          {activePage === 'all' && <AllProjects/>}
          {activePage === 'Completed' && <CompletedProjects/>}
          {activePage === 'Rejected' && <RejectedProjects/>}
          {activePage === 'Pending' && <PendingProjects/>}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default Projects