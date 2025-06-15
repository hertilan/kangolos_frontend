import React, { useState } from 'react';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiPieChart, FiBell, FiSettings, FiLogOut, FiBook, FiCheckCircle } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { BsGraphUp, BsCalendarCheck } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const HODDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'New Project Submission', 
      message: 'Team Alpha submitted their project proposal', 
      time: '30 mins ago', 
      read: false 
    },
    { 
      id: 2, 
      title: 'Supervisor Assignment', 
      message: 'Dr. Niyonkuru requested to supervise 3 projects', 
      time: '2 hours ago', 
      read: true 
    },
  ]);

  // Sample data for University of Rwanda final year projects
  const projectStats = {
    totalProjects: 48,
    approved: 32,
    pendingReview: 12,
    rejected: 4,
    supervisors: 15,
    students: 96
  };

  const recentActivities = [
    { id: 1, action: 'Approved project proposal', user: 'Team Innovators', time: '1 hour ago' },
    { id: 2, action: 'Assigned supervisor', user: 'Dr. Uwimana', time: '3 hours ago' },
    { id: 3, action: 'Scheduled defense', user: 'Team TechSol', time: '1 day ago' },
  ];

  const upcomingDefenses = [
    { id: 1, title: 'AI for Crop Disease Detection', date: '2023-06-15', time: '10:00 AM', venue: 'ICT Building Room 101', team: 'Team AgriTech' },
    { id: 2, title: 'Blockchain for Land Registry', date: '2023-06-18', time: '2:00 PM', venue: 'Main Campus Hall B', team: 'Team ChainSafe' },
  ];

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
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
            <FiHome className="mr-3" />
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
              setActiveTab('students');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'students' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaUserGraduate className="mr-3" />
            Students
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
              setActiveTab('defenses');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'defenses' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BsCalendarCheck className="mr-3" />
            Defenses
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
              Settings
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
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'Final Year Projects Dashboard'}
            {activeTab === 'projects' && 'Project Management'}
            {activeTab === 'students' && 'Student Management'}
            {activeTab === 'supervisors' && 'Supervisor Management'}
            {activeTab === 'teams' && 'Project Teams'}
            {activeTab === 'defenses' && 'Defense Scheduling'}
            {activeTab === 'settings' && 'Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell className="text-gray-600" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              <div className="hidden absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1 z-50">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
                <div className="border-t border-gray-200 px-4 py-2 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-medium">
                HOD
              </div>
              <span className="ml-2 text-sm font-medium hidden md:inline">Dr. Department Head</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-2xl font-bold">{projectStats.totalProjects}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FiBook size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Approved Projects</p>
                      <h3 className="text-2xl font-bold text-green-600">{projectStats.approved}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FiCheckCircle size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Review</p>
                      <h3 className="text-2xl font-bold text-yellow-600">{projectStats.pendingReview}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <FiFileText size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-2xl font-bold">{projectStats.supervisors}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <FaChalkboardTeacher size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities and Upcoming Defenses */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BsGraphUp className="mr-2" /> Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <FiFileText size={16} />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.user} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BsCalendarCheck className="mr-2" /> Upcoming Defenses
                  </h3>
                  <div className="space-y-4">
                    {upcomingDefenses.map(defense => (
                      <div key={defense.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-medium">{defense.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{defense.date}</span> at {defense.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Team:</span> {defense.team}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Venue:</span> {defense.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                      <FiCheckCircle size={18} />
                    </div>
                    <span className="text-sm font-medium">Approve Project</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                      <FaChalkboardTeacher size={18} />
                    </div>
                    <span className="text-sm font-medium">Assign Supervisor</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                      <BsCalendarCheck size={18} />
                    </div>
                    <span className="text-sm font-medium">Schedule Defense</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                      <FiFileText size={18} />
                    </div>
                    <span className="text-sm font-medium">Generate Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Project Management</h3>
              <p className="text-gray-500">Project management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Student Management</h3>
              <p className="text-gray-500">Student management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'supervisors' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Supervisor Management</h3>
              <p className="text-gray-500">Supervisor management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Project Teams</h3>
              <p className="text-gray-500">Project team management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'defenses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Defense Scheduling</h3>
              <p className="text-gray-500">Defense scheduling interface will be displayed here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HODDashboard;