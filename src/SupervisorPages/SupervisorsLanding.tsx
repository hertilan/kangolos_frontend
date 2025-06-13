import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiFileText, FiCalendar,FiMessageSquare,FiSettings,FiLogOut } from 'react-icons/fi';
import Header from '../SupervisorSmall/SupervisorHeader';
import SupervisorDashboard from '../SupervisorSmall/SupervisorDashboard';

const SupervisorLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">Supervisor</h1>
        </div>
        <nav className="mt-6">
          {[
            { icon: <FiHome />, name: 'Dashboard', id: 'dashboard' },
            { icon: <FiFileText />, name: 'Projects', id: 'projects' },
            { icon: <FiCalendar />, name: 'Calendar', id: 'calendar' },
            { icon: <FiMessageSquare />, name: 'Messages', id: 'messages' },
            { icon: <FiSettings />, name: 'Settings', id: 'settings' },
            {icon: <FiLogOut/> , name: 'Logout', id:'logout'}
          ].map((item) => (
            <Link
              key={item.id}
              to={item.name =='Logout' ? "/" : "#"}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center px-6 py-3 ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Header/>

        {/* Dashboard Content */}
        <SupervisorDashboard/>
      </div>
    </div>
  );
};

export default SupervisorLanding;