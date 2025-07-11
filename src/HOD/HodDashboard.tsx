import React, { useState } from 'react';
import {FiLogOut, FiBook, FiMessageSquare } from 'react-icons/fi';
import { FaUserGraduate } from 'react-icons/fa';
import { BsCalendarCheck } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import Projects from '../Admin/Projects/Projects';
import Users from '../Admin/Users/Users';
// import ViewStaffs from '../Admin/Users/ViewStaffs';
import HodOverview from './HodOverview';
import { MdDashboard, MdSchool } from 'react-icons/md';
import HodHeader from './HodHeader';
import Feedback from '../Principal/Feedback';
// import { useAuth } from '../context/AuthContext';
import University from '../Institutions/University/University';
import { useNavigate } from 'react-router-dom';
import AllTeams from '../Admin/Teams/AllTeams';
import ReportsPage from '../SupervisorSmall/Reports';

const HODDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
      const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
    }
     // const { logout } = useAuth();;


  // Sample data for University of Rwanda final year projects



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

      {/* Sidebar */}
      <div className={`w-64 bg-blue-900 text-white shadow-lg transform transition-all duration-300 fixed md:static z-40 h-full
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <h1 className="text-xl font-bold">HOD Dashboard</h1>
          <p className="text-sm text-blue-200">Computer Science Department</p>
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
            <MdDashboard className="mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab('projects');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'projects' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiBook className="mr-3" />
            Projects
          </button>
          <button
            onClick={() => {
              setActiveTab('institutions');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'institutions' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <MdSchool className="mr-3" />
            Institutions
          </button>
          <button
            onClick={() => {
              setActiveTab('users');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'users' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaUserGraduate className="mr-3" />
            users
          </button>
          {/* <button
            onClick={() => {
              setActiveTab('supervisors');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'supervisors' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Supervisors
          </button> */}
          <button
            onClick={() => {
              setActiveTab('teams');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'teams' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <RiTeamFill className="mr-3" />
            Project Teams
          </button>
          <button
            onClick={() => {
              setActiveTab('reports');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'reports' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BsCalendarCheck className="mr-3" />
            Reports
          </button>
          <div className="mt-12">
            {/* <button
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
              className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              <FiSettings className="mr-3" />
              Settings
            </button> */}
            <button
              onClick={() => {
                setShowFeedbackModal(true);
              }}
              className="flex items-center w-full px-4 py-2 text-blue-200 hover:text-white mb-2"
            >
              <FiMessageSquare className="mr-3" />
              Send Feedback
            </button>
            <button
              className="flex items-center w-full px-6 py-3 text-left hover:bg-blue-700"
              onClick={logout}
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-blue-800 bg-blue-900">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white">
              HOD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Dr. Department Head</p>
              <p className="text-xs text-blue-200">Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <HodHeader/>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <HodOverview/>
          )}

          {activeTab === 'projects' && (
            <Projects/>
          )}
          {activeTab === 'institutions' && (
            <University displayed={false} viewAddSchool={false} />
          )}

          {activeTab === 'users' && (
            <Users/>
          )}

          {/* {activeTab === 'supervisors' && (
            <ViewStaffs/>
          )} */}

          {activeTab === 'teams' && (
            <AllTeams/>
          )}

          {activeTab === 'reports' && (
            <ReportsPage/>
          )}
        </main>
      </div>
    </div>
  );
};

export default HODDashboard;