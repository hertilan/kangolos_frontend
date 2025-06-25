import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import universityLogo from '../assets/white.png';
import {  FiHome, FiUsers, FiFileText, FiLogOut, FiChevronDown, FiBell, FiSearch, FiUser, FiBook, FiActivity, FiMessageSquare
} from 'react-icons/fi';
import { RiTeamFill } from 'react-icons/ri';
import Dashboard from './Dashboard';
import Users from './Users/Users';
import Projects from './Projects/Projects';
import Feedback from '../Principal/Feedback';
import University from '../Institutions/University/University';
import ReportsPage from '../SupervisorSmall/Reports';
import AllTeams from './Teams/AllTeams';
// import { useAuth } from '../context/AuthContext';

interface Tab {
  icon: React.ReactNode;
  name: string;
  id: string;
}

const AdminLanding: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registration', time: '10 mins ago', read: false },
    { id: 2, message: 'System maintenance scheduled', time: '1 hour ago', read: true }
  ]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
          // const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
    }
     // const { logout } = useAuth();;

  const tabs: Tab[] = [
    { icon: <FiHome size={18} />, name: 'Dashboard', id: 'dashboard' },
    { icon: <FiUsers size={18} />, name: 'Users', id: 'users' },
    { icon: <FiFileText size={18} />, name: 'Projects', id: 'projects' },
    { icon: <RiTeamFill size={18} />, name: 'Teams', id: 'teams' },
    { icon: <FiBook size={18} />, name: 'University', id: 'university' },
    { icon: <FiActivity size={18} />, name: 'Logs', id: 'logs' },
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === 'logout') {
      localStorage.removeItem('adminToken');
      navigate('/');
      return;
    }
    setActiveTab(tabId);
    setShowMobileMenu(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'teams': return <AllTeams />;
      case 'projects': return <Projects />;
      case 'university': return <University displayed={true} viewAddSchool={true} />;
      case 'logs': return <ReportsPage/>;
      default: return <Dashboard />;
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="flex h-fit bg-gray-50">
        {showFeedbackModal && (
        <Feedback onClose={()=>{setShowFeedbackModal(false)}}/>
      )}
      {/* Mobile Menu Button */}
      <button  type='button'
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">

        <FiChevronDown className={`transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar */}
      <div className={`w-64 bg-indigo-700 shadow-md overflow-y-auto transform transition-all gap-5  flex flex-col  duration-300 fixed md:static z-40 h-screen
        ${showMobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-indigo-600">
          <img src={universityLogo} alt='logo' className='w-16 h-16 rounded-full mx-auto mb-2' />
          <h1 className="text-xl font-bold text-white text-center">Admin Portal</h1>
          <p className="text-xs text-indigo-200 text-center mt-1">University of Rwanda</p>
        </div>
        
        {/* Search in mobile view */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-indigo-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <nav className="mt-4 h-[calc(100%-180px)] flex flex-col gap-3">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center px-6 py-1 text-left transition-colors
                ${activeTab === item.id 
                  ? 'bg-white text-indigo-600 border-r-4 border-white' 
                  : 'text-indigo-200 hover:bg-indigo-600'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
            
          ))}
                    <button
                      onClick={() => {
                        setShowFeedbackModal(true);
                      }}
                      className="flex items-center w-full px-4 py-2 text-blue-200 hover:text-white mb-2"
                    >
                      <FiMessageSquare className="mr-3" />
                      Send Feedback
                    </button>
          
          {/* Logout button */}
          <button
            onClick={logout}
            className="w-full flex items-center px-6 py-3 text-left text-indigo-200 hover:bg-indigo-600 mt-4">
            <span className="mr-3"><FiLogOut size={18} /></span>
            Logout
          </button>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-600 bg-indigo-700">
          
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <FiUser />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-indigo-200">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto ">
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
                  placeholder="Search users, projects..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <span className="ml-2 text-sm font-medium hidden md:inline">Admin User</span>
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

export default AdminLanding;