import React, { useState } from 'react';
import { FiHome, FiUsers, FiCalendar, FiFileText, FiPieChart, FiBell, FiSettings, FiLogOut, FiCheckCircle } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';
import { BsGraphUp, BsBuilding } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const DeanDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'New Department Report', 
      message: 'Computer Science submitted quarterly projects report', 
      time: '1 hour ago', 
      read: false 
    },
    { 
      id: 2, 
      title: 'Approval Required', 
      message: '5 projects need final dean approval', 
      time: '3 hours ago', 
      read: true 
    },
  ]);

  // Sample data for University of Rwanda
  const schoolStats = {
    departments: 6,
    totalProjects: 286,
    completed: 192,
    inProgress: 84,
    supervisors: 68,
    students: 572
  };

  const departments = [
    { name: "Computer Science", projects: 48, completed: 32, color: "bg-blue-100 text-blue-800" },
    { name: "Electrical Engineering", projects: 42, completed: 28, color: "bg-green-100 text-green-800" },
    { name: "Civil Engineering", projects: 38, completed: 25, color: "bg-yellow-100 text-yellow-800" },
    { name: "Mechanical Engineering", projects: 35, completed: 22, color: "bg-red-100 text-red-800" },
    { name: "Biomedical Engineering", projects: 32, completed: 20, color: "bg-purple-100 text-purple-800" },
    { name: "Architecture", projects: 30, completed: 18, color: "bg-indigo-100 text-indigo-800" },
  ];

  const recentActivities = [
    { id: 1, action: 'Approved department budget', user: 'Finance Committee', time: '2 hours ago' },
    { id: 2, action: 'Reviewed projects report', user: 'Quality Assurance', time: '1 day ago' },
    { id: 3, action: 'Scheduled school-wide defenses', user: 'Academic Committee', time: '2 days ago' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'School Board Meeting', date: '2023-06-20', time: '9:00 AM', venue: 'Main Campus Senate Hall' },
    { id: 2, title: 'Final Projects Exhibition', date: '2023-06-25', time: '8:00 AM', venue: 'ICT Innovation Hub' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - UR Colors */}
      <div className="w-64 bg-blue-900 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold">Dean's Dashboard</h1>
          <p className="text-sm text-blue-200">School of Engineering</p>
          <p className="text-xs text-blue-300 mt-1">University of Rwanda</p>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'dashboard' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiHome className="mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'departments' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <BsBuilding className="mr-3" />
            Departments
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'projects' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiFileText className="mr-3" />
            All Projects
          </button>
          <button
            onClick={() => setActiveTab('supervisors')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'supervisors' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Supervisors
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'reports' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiPieChart className="mr-3" />
            Reports
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'calendar' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            <FiCalendar className="mr-3" />
            Academic Calendar
          </button>
          <div className="mt-12">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center w-full px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              <FiSettings className="mr-3" />
              School Settings
            </button>
            <Link to='/' className="flex items-center w-full px-6 py-3 text-left hover:bg-blue-700">
              <FiLogOut className="mr-3" />
              Logout
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'dashboard' && 'School Overview'}
            {activeTab === 'departments' && 'Department Management'}
            {activeTab === 'projects' && 'All Final Year Projects'}
            {activeTab === 'supervisors' && 'Supervisors Overview'}
            {activeTab === 'reports' && 'School Reports'}
            {activeTab === 'calendar' && 'Academic Calendar'}
            {activeTab === 'settings' && 'School Settings'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell className="text-gray-600" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-medium">
                D
              </div>
              <span className="ml-2 text-sm font-medium">Prof. Dean Name</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* School Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Departments</p>
                      <h3 className="text-2xl font-bold">{schoolStats.departments}</h3>
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
                      <h3 className="text-2xl font-bold">{schoolStats.totalProjects}</h3>
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
                      <h3 className="text-2xl font-bold text-purple-600">{schoolStats.completed}</h3>
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
                      <h3 className="text-2xl font-bold">{schoolStats.supervisors}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <FaChalkboardTeacher size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments Progress */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Departments Progress</h3>
                <div className="space-y-4">
                  {departments.map(dept => (
                    <div key={dept.name} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{dept.name}</span>
                        <span>{dept.completed}/{dept.projects} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${dept.color.split(' ')[0]}`} 
                          style={{ width: `${(dept.completed/dept.projects)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities and Upcoming Events */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
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
                  <h3 className="text-lg font-semibold mb-4">Upcoming School Events</h3>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">{event.date}</span> at {event.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Venue:</span> {event.venue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Department Management</h3>
              <p className="text-gray-500">Department management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">All Final Year Projects</h3>
              <p className="text-gray-500">School-wide projects interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'supervisors' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Supervisors Overview</h3>
              <p className="text-gray-500">Supervisor management interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">School Reports</h3>
              <p className="text-gray-500">Reporting interface will be displayed here</p>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Academic Calendar</h3>
              <p className="text-gray-500">School calendar interface will be displayed here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeanDashboard;