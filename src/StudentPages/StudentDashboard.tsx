import React, { useState, useEffect } from 'react';
import Header from '../StudentSmall/Header';
import { FaPlus, FaBell, FaCalendarAlt, FaProjectDiagram, FaBars, FaTimes } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Myprojects from '../StudentSmall/Myprojects';
import Notifications from './Notifications';
import DeadLines from '../StudentSmall/DeadLines';
import PageLayout from '../Components/PageLayout';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, label, value, trend }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  return (
    <div className='flex flex-col p-4 sm:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100'>
      <div className='flex justify-between items-start'>
        <div className={`p-2 sm:p-3 rounded-full ${typeof value === 'number' ? 'bg-blue-50' : 'bg-indigo-50'}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trendColor}`}>
            {trend === 'up' ? '↑' : '↓'} 
          </span>
        )}
      </div>
      <p className='text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4'>{label}</p>
      <h1 className='text-xl sm:text-2xl font-semibold mt-1 text-gray-800'>{value}</h1>
    </div>
  );
};

const NavButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}> = ({ active, onClick, children }) => (
  <button
    className={`px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const StudentDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('myProjects');
  const [stats, setStats] = useState({
    activeProjects: 0,
    rejectedProjects: 0,
    pendingProjects: 0,
    notifications: 0
  });
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          setStats({
            activeProjects: 1,
            rejectedProjects: 4,
            pendingProjects: 2,
            notifications: 3
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const dashboardCards = [
    {
      icon: <FaProjectDiagram size={18} className='text-indigo-600' />,
      label: 'Active Projects',
      value: stats.activeProjects,
      trend: stats.activeProjects > 0 ? 'up' as const : 'neutral' as const
    },
    {
      icon: <CiFileOn size={18} className='text-red-600' />,
      label: 'Rejected Projects',
      value: stats.rejectedProjects,
      trend: stats.rejectedProjects > 0 ? 'down' as const : 'neutral' as const
    },
    {
      icon: <CiFileOn size={18} className='text-yellow-600' />,
      label: 'Pending Review',
      value: stats.pendingProjects,
      trend: 'neutral' as const
    },
    {
      icon: <FaBell size={18} className='text-blue-600' />,
      label: 'Unread Notifications',
      value: stats.notifications,
      trend: stats.notifications > 0 ? 'up' as const : 'neutral' as const
    }
  ];

  const renderActivePage = () => {
    switch (activePage) {
      case 'myProjects':
        return <Myprojects />;
      case 'notifications':
        return <Notifications />;
      case 'deadlines':
        return <DeadLines />;
      default:
        return <Myprojects />;
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col bg-gray-50'>
      <Header />
      
      <PageLayout>
        <div className='py-6 sm:py-8'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8'>
            <div>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>Student Dashboard</h1>
              <p className='text-gray-500 text-sm sm:text-base mt-2'>Welcome back! Here's your academic overview</p>
            </div>
            <Link 
              to='create-project' 
              className='flex items-center gap-2 bg-indigo-600 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-white hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap text-sm sm:text-base'
            >
              <FaPlus size={16} />
              <span className='font-medium'>Submit New Project</span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className='md:hidden mb-4 p-2 bg-gray-200 rounded-lg'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-28 sm:h-36 animate-pulse">
                  <div className="h-5 sm:h-6 w-5 sm:w-6 bg-gray-200 rounded-full mb-3 sm:mb-4"></div>
                  <div className="h-3 sm:h-4 w-3/4 bg-gray-200 rounded mb-2 sm:mb-3"></div>
                  <div className="h-6 sm:h-8 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8'>
              {dashboardCards.map((card, index) => (
                <DashboardCard 
                  key={index}
                  icon={card.icon}
                  label={card.label}
                  value={card.value}
                  trend={card.trend}
                />
              ))}
            </div>
          )}

          <div className={`flex flex-wrap gap-2 p-2 bg-gray-100 rounded-xl w-full mb-6 sm:mb-8 ${mobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            <NavButton 
              active={activePage === 'myProjects'} 
              onClick={() => {
                setActivePage('myProjects');
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <FaProjectDiagram size={14} />
                <span>My Projects</span>
              </div>
            </NavButton>
            <NavButton 
              active={activePage === 'notifications'} 
              onClick={() => {
                setActivePage('notifications');
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <FaBell size={14} />
                <span>Notifications</span>
              </div>
            </NavButton>
            <NavButton 
              active={activePage === 'deadlines'} 
              onClick={() => {
                setActivePage('deadlines');
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <FaCalendarAlt size={14} />
                <span>Deadlines</span>
              </div>
            </NavButton>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            {renderActivePage()}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default StudentDashboard;