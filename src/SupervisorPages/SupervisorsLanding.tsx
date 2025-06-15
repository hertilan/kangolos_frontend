import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiCalendar,FiMessageSquare,FiSettings,FiLogOut } from 'react-icons/fi';
import Header from '../SupervisorSmall/SupervisorHeader';
import SupervisorDashboard from '../SupervisorSmall/SupervisorDashboard';
import Projects from '../Admin/Projects/Projects';
import Team from '../StudentPages/Team';
import SupervisorCalendar from './SupervisorCalender';
import Messaging from './Messaging';
import SupervisorSettings from './SupervisorSettings';

interface Tab {
  icon: React.ReactNode;
  name: string;
  id: string;
}

const SupervisorLanding: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabs: Tab[] = [
    { icon: <FiHome />, name: 'Dashboard', id: 'dashboard' },
    { icon: <FiFileText />, name: 'Projects', id: 'projects' },
    { icon: <FiCalendar />, name: 'Calendar', id: 'calendar' },
    { icon: <FiMessageSquare />, name: 'Messages', id: 'messages' },
    { icon: <FiSettings />, name: 'Settings', id: 'settings' },
    { icon: <FiLogOut />, name: 'Logout', id: 'logout' }
  ];

    const handleTabChange = (tabId: string) => {
    if (tabId === 'logout') {
      // Perform logout logic here
      navigate('/');
      return;
    }
    setActiveTab(tabId);
  };

    const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SupervisorDashboard />;
      case 'projects':
        return <Projects />;
      case 'calendar':
        return <SupervisorCalendar />;
      case 'messages':
        return <Messaging/>;
      case 'settings':
        return <SupervisorDashboard />;
      default:
        return <SupervisorDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">Supervisor</h1>
        </div>
        <nav className="mt-6">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left ${activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Header/>

        {/* Dashboard Content */}
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default SupervisorLanding;