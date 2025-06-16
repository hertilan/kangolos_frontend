import React, { useState } from 'react'
import { FiBell } from 'react-icons/fi';

const HodHeader :React.FC= () => {
    const [activeTab, setActiveTab] = useState('dashboard');
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

      const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  return (
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
  )
}

export default HodHeader
