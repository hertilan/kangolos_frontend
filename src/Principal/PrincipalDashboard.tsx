import React, { useState } from 'react';
import { FiHome, FiEye, FiTrendingUp, FiCalendar, FiPieChart, FiMapPin, FiFileText, FiCheckCircle } from 'react-icons/fi';
import { FaUniversity } from 'react-icons/fa';
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs';

const PrincipalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - UR Colors (Read-only) */}
      <div className="w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold">Principal's Dashboard</h1>
          <p className="text-sm text-blue-200">Monitoring View</p>
          <p className="text-xs text-blue-300 mt-1">University of Rwanda</p>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'overview' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiHome className="mr-3" />
            University Overview
          </button>
          <button
            onClick={() => setActiveTab('campuses')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'campuses' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaUniversity className="mr-3" />
            Campuses
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'progress' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiTrendingUp className="mr-3" />
            Academic Progress
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'calendar' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiCalendar className="mr-3" />
            Academic Calendar
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'reports' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiPieChart className="mr-3" />
            Institutional Reports
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 text-xs text-blue-300">
          <p>View-only access</p>
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
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-medium">
              P
            </div>
            <span className="ml-2 text-sm font-medium">Principal</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* University Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Campuses</p>
                      <h3 className="text-2xl font-bold">6</h3>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaUniversity size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-2xl font-bold">{campusStats.totalProjects}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FiFileText size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <h3 className="text-2xl font-bold text-purple-600">{campusStats.completed}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <FiCheckCircle size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-2xl font-bold">{campusStats.supervisors}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <BsPeopleFill size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Campuses Progress */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="mr-2" /> Campuses Project Completion
                </h3>
                <div className="space-y-4">
                  {campusProgress.map(campus => (
                    <div key={campus.name} className="mb-3">
                      <div className="flex justify-between mb-1">
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

              {/* Recent Activities */}
              <div className="bg-white rounded-lg shadow p-6">
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
                        <p className="text-gray-600">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campuses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <FaUniversity className="mr-2" /> {selectedCampus === 'All Campuses' ? 'All Campuses' : campuses.find(c => c.code === selectedCampus)?.name}
              </h3>
              
              {selectedCampus === 'All Campuses' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campuses.map(campus => (
                    <div key={campus.code} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg mb-2">{campus.name}</h4>
                      <p className="text-gray-600 mb-3 flex items-center">
                        <FiMapPin className="mr-1" /> {campus.location}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Projects: 240</span>
                        <span className="text-green-600">Completed: 180</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <p className="text-sm text-blue-800">Total Projects</p>
                      <h4 className="text-2xl font-bold">320</h4>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <p className="text-sm text-green-800">Completed</p>
                      <h4 className="text-2xl font-bold">240</h4>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                      <p className="text-sm text-yellow-800">Supervisors</p>
                      <h4 className="text-2xl font-bold">45</h4>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold mb-4">Recent Activities</h4>
                    <div className="space-y-3">
                      <p className="text-sm">• Final defenses completed (June 15)</p>
                      <p className="text-sm">• New projects registered (June 10)</p>
                      <p className="text-sm">• Supervisor meeting held (June 5)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Academic Progress Monitoring</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                Project completion timeline visualization
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">University Academic Calendar</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                Calendar visualization (read-only)
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Institutional Reports</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium">Annual Projects Report 2023</h4>
                  <p className="text-sm text-gray-600">Generated on June 1, 2023</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium">Supervisor Performance Analysis</h4>
                  <p className="text-sm text-gray-600">Generated on May 15, 2023</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <h4 className="font-medium">Student Project Completion Rates</h4>
                  <p className="text-sm text-gray-600">Generated on May 1, 2023</p>
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