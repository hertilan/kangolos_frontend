import React, { useState } from 'react';
import { FiHome, FiCalendar, FiFileText, FiPieChart, FiSettings, FiLogOut, FiMessageSquare } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Projects from '../Admin/Projects/Projects';
import Colleges from '../Admin/Colleges/College';
import Users from '../Admin/Users/Users';
import SupervisorCalendar from '../SupervisorPages/SupervisorCalender';
import DeanHeader from './DeanHeader';
import DeanOverview from './DeanOverview';
import Feedback from '../Principal/Feedback';

const DeanDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);




  return (
    <div className="flex h-screen bg-gray-50">
              {showFeedbackModal && (
        <Feedback onClose={()=>{setShowFeedbackModal(false)}}/>
      )}
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {mobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar - UR Colors */}
      <div className={`w-64 bg-blue-900 text-white shadow-lg transform transition-all duration-300 fixed md:static z-40 h-full
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <h1 className="text-xl font-bold">Dean's Dashboard</h1>
          <p className="text-sm text-blue-200">School of Engineering</p>
          <p className="text-xs text-blue-300 mt-1">University of Rwanda</p>
        </div>
        <nav className="mt-6 overflow-y-auto h-[calc(100%-180px)]">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiHome className="mr-3" />
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('departments');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'departments' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BsBuilding className="mr-3" />
            Departments
          </button>
          <button
            onClick={() => {
              setActiveTab('projects');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'projects' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiFileText className="mr-3" />
            All Projects
          </button>
          <button
            onClick={() => {
              setActiveTab('supervisors');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'supervisors' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Supervisors
          </button>
          <button
            onClick={() => {
              setActiveTab('reports');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'reports' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiPieChart className="mr-3" />
            Reports
          </button>
          <button
            onClick={() => {
              setActiveTab('calendar');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'calendar' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiCalendar className="mr-3" />
            Academic Calendar
          </button>
          <div className="mt-12">
            <button
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              <FiSettings className="mr-3" />
              School Settings
            </button>
                                <button
                                  onClick={() => {
                                    setShowFeedbackModal(true);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-blue-200 hover:text-white mb-2"
                                >
                                  <FiMessageSquare className="mr-3" />
                                  Send Feedback
                                </button>
            <Link 
              to='/' 
              className="flex items-center w-full px-6 py-3 text-left hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiLogOut className="mr-3" />
              Logout
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <DeanHeader/>
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <DeanOverview/>
          )}

          {activeTab === 'departments' && (
            <Colleges displayed={false} viewAddSchool={true}/>
          )}

          {activeTab === 'projects' && (
            <Projects/>
          )}

          {activeTab === 'supervisors' && (
            <Users/>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6">School Reports</h3>
              <p className="text-gray-500">Reporting interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'calendar' && (
            <SupervisorCalendar/>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeanDashboard;