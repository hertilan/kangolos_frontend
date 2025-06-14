import React, { useState } from 'react';
import Header from '../StudentSmall/Header';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaFilter } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const ViewProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'reviews' | 'drafts'>('all');
  const [projectStatus, setProjectStatus] = useState<'all' | 'active' | 'completed' | 'rejected'>('all');
  const [showStatusFilter, setShowStatusFilter] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'drafts', label: 'Drafts' }
  ];

  const statusFilters = [
    { id: 'all', label: 'All Statuses' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'rejected', label: 'Rejected' }
  ];

  return (
    <div className='w-full flex flex-col min-h-screen bg-gray-50'>
      <Header />
      
      <div className='w-full p-6 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
          <div className='flex items-center gap-4'>
            <Link 
              to='/student' 
              className='flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors'
            >
              <FaArrowLeft size={20} />
              <span className='font-medium'>Back to Dashboard</span>
            </Link>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>My Projects</h1>
              <p className='text-gray-500'>Manage and track your projects</p>
            </div>
          </div>
          
          <Link 
            to='/student/create-project' 
            className='flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md whitespace-nowrap'
          >
            <FaPlus size={18} />
            <span className='font-medium'>Submit New Project</span>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className='flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg w-fit mb-6'>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Filter - Desktop */}
        <div className='hidden md:flex items-center gap-4 mb-6'>
          <span className='text-gray-600 text-sm'>Filter by:</span>
          <div className='flex flex-wrap gap-2'>
            {statusFilters.map(filter => (
              <button
                key={filter.id}
                className={`px-4 py-2 text-sm rounded-md transition-all ${
                  projectStatus === filter.id
                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setProjectStatus(filter.id as any)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter - Mobile */}
        <div className='md:hidden relative mb-6'>
          <button 
            className='flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700'
            onClick={() => setShowStatusFilter(!showStatusFilter)}
          >
            <FaFilter size={14} />
            <span>Filter: {statusFilters.find(f => f.id === projectStatus)?.label}</span>
            <FiChevronDown className={`transition-transform ${showStatusFilter ? 'rotate-180' : ''}`} />
          </button>
          
          {showStatusFilter && (
            <div className='absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2'>
              {statusFilters.map(filter => (
                <button
                  key={filter.id}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    projectStatus === filter.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setProjectStatus(filter.id as any);
                    setShowStatusFilter(false);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Projects Content Area */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          {/* Placeholder for projects list - replace with your actual projects component */}
          <div className='text-center py-12 text-gray-500'>
            {activeTab === 'all' && projectStatus === 'all' && 'All projects will appear here'}
            {activeTab === 'reviews' && 'Projects under review will appear here'}
            {activeTab === 'drafts' && 'Draft projects will appear here'}
            {projectStatus === 'active' && 'Active projects will appear here'}
            {projectStatus === 'completed' && 'Completed projects will appear here'}
            {projectStatus === 'rejected' && 'Rejected projects will appear here'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjects;