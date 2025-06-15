import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiEye, 
  FiTrendingUp, 
  FiCalendar, 
  FiPieChart, 
  FiMapPin, 
  FiLogOut, 
  FiMessageSquare,
  FiUser,
  FiFileText,
  FiCheckCircle
} from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs';

const PrincipalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // UR Campuses data
  const campuses = [
    { name: "College of Science and Technology", location: "Nyarugenge", code: "CST" },
    { name: "College of Medicine and Health Sciences", location: "Huye", code: "CMHS" },
    { name: "College of Business and Economics", location: "Gikondo", code: "CBE" },
    { name: "College of Education", location: "Rukara", code: "CE" },
    { name: "College of Agriculture", location: "Busogo", code: "CA" },
    { name: "College of Arts and Social Sciences", location: "Nyagatare", code: "CASS" },
  ];

  // Sample data
  const campusStats = {
    totalProjects: 1248,
    completed: 872,
    inProgress: 376,
    supervisors: 284,
    students: 2496
  };

  const campusProgress = [
    { name: "CST", projects: 320, completed: 240, color: "bg-blue-500" },
    { name: "CMHS", projects: 220, completed: 180, color: "bg-green-500" },
    { name: "CBE", projects: 200, completed: 150, color: "bg-yellow-500" },
    { name: "CE", projects: 180, completed: 120, color: "bg-red-500" },
    { name: "CA", projects: 160, completed: 100, color: "bg-purple-500" },
    { name: "CASS", projects: 168, completed: 82, color: "bg-indigo-500" },
  ];

  const recentActivities = [
    { id: 1, campus: "CST", action: 'Completed final defenses', time: '2 days ago' },
    { id: 2, campus: "CMHS", action: 'Submitted examination results', time: '3 days ago' },
    { id: 3, campus: "CBE", action: 'Started new projects', time: '1 week ago' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'University Senate Meeting', date: '2023-06-20', time: '9:00 AM', venue: 'Main Campus Senate Hall' },
    { id: 2, title: 'UR Annual Research Conference', date: '2023-06-25', time: '8:00 AM', venue: 'ICT Innovation Hub' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('principalToken');
    navigate('/');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');
    setShowFeedbackModal(false);
    alert('Thank you for your feedback!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-600/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 mb-4"
                rows={5}
                placeholder="Enter your feedback or suggestions..."
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
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
              setActiveTab('progress');
              setMobileMenuOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'progress' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiTrendingUp className="mr-3" />
            Academic Progress
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
            onClick={handleLogout}
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
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'overview' && 'University Overview'}
              {activeTab === 'campuses' && 'Campus Monitoring'}
              {activeTab === 'progress' && 'Academic Progress'}
              {activeTab === 'calendar' && 'Academic Calendar'}
              {activeTab === 'reports' && 'Institutional Reports'}
            </h2>
            {activeTab !== 'overview' && (
              <select 
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option>All Campuses</option>
                {campuses.map(campus => (
                  <option key={campus.code} value={campus.code}>{campus.name}</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Send feedback"
            >
              <FiMessageSquare className="text-gray-600" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-medium">
                <FiUser />
              </div>
              <div className="ml-2 text-right hidden sm:block">
                <p className="text-sm font-medium">Principal</p>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* University Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Campuses</p>
                      <h3 className="text-xl md:text-2xl font-bold">6</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaUniversity size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-xl md:text-2xl font-bold">{campusStats.totalProjects}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-600">
                      <FiFileText size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-purple-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <h3 className="text-xl md:text-2xl font-bold text-purple-600">{campusStats.completed}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600">
                      <FiCheckCircle size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-xl md:text-2xl font-bold">{campusStats.supervisors}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <BsPeopleFill size={18} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Campuses Progress */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="mr-2" /> Campuses Project Completion
                </h3>
                <div className="space-y-4">
                  {campusProgress.map(campus => (
                    <div key={campus.name} className="mb-3">
                      <div className="flex justify-between mb-1 text-sm md:text-base">
                        <span className="font-medium">
                          {campuses.find(c => c.code === campus.name)?.name || campus.name}
                        </span>
                        <span>{campus.completed}/{campus.projects} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${campus.color}`} 
                          style={{ width: `${(campus.completed/campus.projects)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities and Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <FiEye size={16} />
                        </div>
                        <div>
                          <p className="font-medium">
                            {campuses.find(c => c.code === activity.campus)?.name || activity.campus}
                          </p>
                          <p className="text-gray-600 text-sm md:text-base">{activity.action}</p>
                          <p className="text-xs md:text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6">
                  <h3 className="text-lg font-semibold mb-4">Upcoming University Events</h3>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-medium text-sm md:text-base">{event.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          <span className="font-medium">{event.date}</span> at {event.time}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          <span className="font-medium">Venue:</span> {event.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campuses' && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <FaUniversity className="mr-2" /> {selectedCampus === 'All Campuses' ? 'All Campuses' : campuses.find(c => c.code === selectedCampus)?.name}
              </h3>
              
              {selectedCampus === 'All Campuses' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {campuses.map(campus => (
                    <div key={campus.code} className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-base md:text-lg mb-2">{campus.name}</h4>
                      <p className="text-gray-600 mb-3 flex items-center text-sm md:text-base">
                        <FiMapPin className="mr-1" /> {campus.location}
                      </p>
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-gray-500">Projects: {
                          campusProgress.find(c => c.name === campus.code)?.projects || 'N/A'
                        }</span>
                        <span className="text-green-600">Completed: {
                          campusProgress.find(c => c.name === campus.code)?.completed || 'N/A'
                        }</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
                      <p className="text-xs md:text-sm text-blue-800">Total Projects</p>
                      <h4 className="text-xl md:text-2xl font-bold">{
                        campusProgress.find(c => c.name === selectedCampus)?.projects || 'N/A'
                      }</h4>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 md:p-4 border border-green-100">
                      <p className="text-xs md:text-sm text-green-800">Completed</p>
                      <h4 className="text-xl md:text-2xl font-bold">{
                        campusProgress.find(c => c.name === selectedCampus)?.completed || 'N/A'
                      }</h4>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 md:p-4 border border-yellow-100">
                      <p className="text-xs md:text-sm text-yellow-800">Supervisors</p>
                      <h4 className="text-xl md:text-2xl font-bold">{
                        Math.floor((campusProgress.find(c => c.name === selectedCampus)?.projects || 0) / 5)
                      }</h4>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                    <h4 className="font-semibold mb-3 md:mb-4">Recent Activities</h4>
                    <div className="space-y-2 md:space-y-3">
                      {recentActivities
                        .filter(activity => activity.campus === selectedCampus)
                        .map(activity => (
                          <p key={activity.id} className="text-xs md:text-sm">
                            • {activity.action} ({activity.time})
                          </p>
                        ))}
                      {recentActivities.filter(activity => activity.campus === selectedCampus).length === 0 && (
                        <p className="text-xs md:text-sm text-gray-500">No recent activities</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
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
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6">University Academic Calendar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 h-64 md:h-96">
                  <h4 className="font-medium mb-3 md:mb-4">Key Dates</h4>
                  <div className="space-y-3 md:space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="pb-2 md:pb-3 border-b border-gray-200">
                        <p className="font-medium text-sm md:text-base">{event.title}</p>
                        <p className="text-xs md:text-sm text-gray-600">{event.date} • {event.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 md:p-6 h-64 md:h-96 flex items-center justify-center text-gray-400 text-sm md:text-base">
                  Calendar visualization (read-only)
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-6">Institutional Reports</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600 mr-3 md:mr-4">
                      <FiFileText size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm md:text-base">Annual Projects Report</h4>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">2022-2023 Academic Year</p>
                      <button className="mt-2 md:mt-3 text-xs md:text-sm text-blue-600 hover:text-blue-800">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-600 mr-3 md:mr-4">
                      <BsGraphUp size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm md:text-base">Performance Metrics</h4>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">All Campuses Comparison</p>
                      <button className="mt-2 md:mt-3 text-xs md:text-sm text-blue-600 hover:text-blue-800">
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600 mr-3 md:mr-4">
                      <FaUniversity size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm md:text-base">Campus-wise Summary</h4>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">Individual campus reports</p>
                      <button className="mt-2 md:mt-3 text-xs md:text-sm text-blue-600 hover:text-blue-800">
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PrincipalDashboard;