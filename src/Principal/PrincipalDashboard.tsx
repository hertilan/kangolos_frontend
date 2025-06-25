import React, { useState } from 'react';
import { 
  FiHome, 
  FiCalendar, 
  FiPieChart, 
  FiLogOut, 
  FiMessageSquare,
} from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import { BsFillProjectorFill } from 'react-icons/bs';
import PrincipalOverview from './PrincipalOverview';
import SupervisorCalendar from '../SupervisorPages/SupervisorCalender';
import PrincipalHeader from './PrincipalHeader';
import Feedback from './Feedback';
import { BiUser } from 'react-icons/bi';
import Users from '../Admin/Users/Users';
import Projects from '../Admin/Projects/Projects';
// import { useAuth } from '../context/AuthContext';
import University from '../Institutions/University/University';
import { useNavigate } from 'react-router-dom';
import ReportsPage from '../SupervisorSmall/Reports';

const PrincipalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
    }
     // const { logout } = useAuth();;

  
  // UR Campuses data

  // Sample data
  // const campusStats = {
  //   totalProjects: 1248,
  //   completed: 872,
  //   inProgress: 376,
  //   supervisors: 284,
  //   students: 2496
  // };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Feedback Modal */}
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
          <h1 className="text-xl font-bold">Principal's Dashboard</h1>
          <p className="text-sm text-blue-200">Monitoring View</p>
          <p className="text-xs text-blue-300 mt-1">University of Rwanda</p>
        </div>
        <nav className="mt-6 overflow-y-auto h-[calc(100%-180px)]">
          <button
            onClick={() => {
              setActiveTab('overview');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'overview' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiHome className="mr-3" />
            University Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('campuses');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'campuses' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaUniversity className="mr-3" />
            Campuses
          </button>
          <button
            onClick={() => {
              setActiveTab('projects');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'projects' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BsFillProjectorFill className="mr-3" />
            Projects
          </button>
          <button
            onClick={() => {
              setActiveTab('users');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'users' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BiUser className="mr-3" />
            Users
          </button>
          {/* <button
            onClick={() => {
              setActiveTab('progress');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'progress' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiTrendingUp className="mr-3" />
            Academic Progress
          </button> */}
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
          <button
            onClick={() => {
              setActiveTab('reports');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'reports' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiPieChart className="mr-3" />
            Institutional Reports
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={() => {
              setShowFeedbackModal(true);
              setMobileMenuOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-blue-200 hover:text-white mb-2"
          >
            <FiMessageSquare className="mr-3" />
            Send Feedback
          </button>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-blue-200 hover:text-white"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
          <div className="mt-2 text-xs text-blue-300">
            <p>View-only access</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <PrincipalHeader/>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'overview' && (
            <PrincipalOverview/>
          )}

          {activeTab === 'campuses' && (
            <University displayed={false} viewAddSchool={false}/>
          )}
          {activeTab === 'users' && (
            <Users/>
          )}
          {activeTab === 'projects' && (
            <Projects/>
          )}

          {/* {activeTab === 'progress' && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6">Academic Progress Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 h-48 md:h-64 flex flex-col">
                  <h4 className="font-medium mb-3 md:mb-4">Projects Completion Rate</h4>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 md:w-32 h-24 md:h-32 rounded-full border-8 border-blue-500 flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <span className="text-xl md:text-2xl font-bold">
                          {Math.round((campusStats.completed / campusStats.totalProjects) * 100)}%
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {campusStats.completed} of {campusStats.totalProjects} projects completed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 h-48 md:h-64">
                  <h4 className="font-medium mb-3 md:mb-4">Timeline</h4>
                  <div className="h-full flex items-center justify-center text-gray-400 text-sm md:text-base">
                    Project timeline visualization
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {activeTab === 'calendar' && (
            <SupervisorCalendar/>
          )}

          {activeTab === 'reports' && (
            <ReportsPage/>
          )}
        </main>
      </div>
    </div>
  );
};

export default PrincipalDashboard;