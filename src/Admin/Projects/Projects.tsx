import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import AllProjects from './AllProjects';
import RejectedProjects from './RejectedProjects';
import CompletedProjects from './CompletedProject';
import PendingProjects from './PendingProjects';

const Projects: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('all')
  const [activePage, setActivePage] = useState<string>('all')

  const handleSetActive = (page: string) => {
    setActivePage(page)
    setStatus(page === 'all' ? 'all' : page) // Sync status filter with active page
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Project Management</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <select
              name="status"
              aria-label="Filter by status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              onClick={() => {
                // Handle search functionality here
                // You might want to pass search and status to child components
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg w-fit">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'Completed', label: 'Completed' },
          { id: 'Pending', label: 'Pending' },
          { id: 'Rejected', label: 'Rejected' }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activePage === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleSetActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        {activePage === 'all' && <AllProjects searchTerm={search} statusFilter={status} />}
        {activePage === 'Completed' && <CompletedProjects searchTerm={search} />}
        {activePage === 'Rejected' && <RejectedProjects searchTerm={search} />}
        {activePage === 'Pending' && <PendingProjects searchTerm={search} />}
      </div>
    </div>
  )
}

export default Projects