import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiFileText, 
  FiCalendar,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiBell,
  FiSearch,
  FiUser
} from 'react-icons/fi';
import { BsGraphUp} from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import SupervisorDashboard from '../SupervisorSmall/SupervisorDashboard';
import Projects from '../Admin/Projects/Projects';
import SupervisorCalendar from './SupervisorCalender';
import Messaging from './Messaging';
// import SupervisorSettings from './SupervisorSettings';
import Feedback from '../Principal/Feedback';
import { useAuth } from '../context/AuthContext';

interface Tab {
  icon: React.ReactNode;
  name: string;
  id: string;
}

const SupervisorLanding: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Using auth context for logout
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New project submission from Team A', time: '10 mins ago', read: false },
    { id: 2, message: 'Meeting reminder at 2:00 PM', time: '1 hour ago', read: true }
  ]);

  const tabs: Tab[] = [
    { icon: <FiHome size={18} />, name: 'Dashboard', id: 'dashboard' },
    { icon: <FiFileText size={18} />, name: 'Projects', id: 'projects' },
    { icon: <RiTeamFill size={18} />, name: 'Teams', id: 'teams' },
    { icon: <FiCalendar size={18} />, name: 'Calendar', id: 'calendar' },
    { icon: <FiMessageSquare size={18} />, name: 'Messages', id: 'messages' },
    { icon: <BsGraphUp size={18} />, name: 'Reports', id: 'reports' },
    { icon: <FiSettings size={18} />, name: 'Settings', id: 'settings' }
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === 'logout') {
      logout(); // Using auth context logout instead of direct localStorage manipulation
      return;
    }
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <SupervisorDashboard />;
      case 'projects': return <Projects />;
      case 'teams': return <div className="p-6">Teams Management</div>;
      case 'calendar': return <SupervisorCalendar />;
      case 'messages': return <Messaging />;
      case 'reports': return <div className="p-6">Reports Analytics</div>;
      case 'settings': return <SupervisorDashboard />;
      default: return <SupervisorDashboard />;
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
        {showFeedbackModal && (
        <Feedback onClose={()=>{setShowFeedbackModal(false)}}/>
      )}
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <FiChevronDown className={`transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-md transform transition-all duration-300 fixed md:static z-40 h-full
        ${showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Supervisor Portal</h1>
          <p className="text-sm text-gray-500 mt-1">University of Rwanda</p>
        </div>
        
        {/* Search in mobile view */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <nav className="mt-4 overflow-y-auto h-[calc(100%-180px)]">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors
                ${activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
          <button
            onClick={() => {
              setShowFeedbackModal(true);
            }}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:text-gray-500 mb-2"
          >
            <FiMessageSquare className="mr-3" />
            Send Feedback
          </button>
          
          {/* Logout button */}
          <button
            onClick={() => handleTabChange('logout')}
            className="w-full flex items-center px-6 py-3 text-left text-gray-600 hover:bg-gray-100 mt-4"
          >
            <span className="mr-3"><FiLogOut size={18} /></span>
            Logout
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FiUser />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Dr. Supervisor</p>
              <p className="text-xs text-gray-500">Computer Science</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
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
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
                <div className="border-t border-gray-200 px-4 py-2 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                <FiUser size={16} />
              </div>
              <span className="ml-2 text-sm font-medium hidden md:inline">Dr. Supervisor</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};


export default SupervisorLanding;