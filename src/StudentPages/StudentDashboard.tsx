import React, { useState } from 'react';
import Header from '../StudentSmall/Header';
// import Footer from '../Components/Footer';
import { FaPlus } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Myprojects from '../StudentSmall/Myprojects';
import Notifications from './Notifications';
import DeadLines from '../StudentSmall/DeadLines';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, label, value }) => (
  <div className='flex flex-col items-center p-4 bg-[#1A3753] rounded-md hover:scale-[1.02] transition-transform duration-200 cursor-pointer shadow-md'>
    <div className='self-end'>{icon}</div>
    <p className='text-gray-400 text-sm mt-2'>{label}</p>
    <h1 className='text-xl font-medium mt-1'>{value}</h1>
  </div>
);

const NavButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}> = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 cursor-pointer transition-colors duration-300 ease-in-out ${
      active 
        ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md font-medium' 
        : 'text-gray-600 hover:text-[#2C4FFF]'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const StudentDashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('myProjects');
  
  const dashboardCards = [
    {
      icon: <CiFileOn size={25} className='text-[#2C4FFF]' />,
      label: 'Active projects',
      value: 1
    },
    {
      icon: <CiFileOn size={25} className='text-[#2C4FFF]' />,
      label: 'Rejected',
      value: 4
    },
    {
      icon: <CiFileOn size={25} className='text-[#2C4FFF]' />,
      label: 'Academic Year',
      value: '2024 - 2025'
    },
    {
      icon: <CiFileOn size={25} className='text-[#2C4FFF]' />,
      label: 'Department',
      value: 'Computer Science'
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
      
      <div className='p-5 w-full max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
            <p className='text-gray-500'>Welcome back, John</p>
          </div>
          <Link 
            to='create-project' 
            className='flex items-center gap-2 bg-[#00628B] px-4 py-2 rounded-md text-white hover:bg-[#3d94bd] transition-colors duration-300'
          >
            <FaPlus size={20} />
            <span>Submit new project</span>
          </Link>
        </div>

        <div className='grid grid-cols-1 text-white md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
          {dashboardCards.map((card, index) => (
            <DashboardCard 
              key={index}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>

        <div className='flex gap-1 p-1 bg-gray-100 rounded-md w-fit mb-6'>
          <NavButton 
            active={activePage === 'myProjects'} 
            onClick={() => setActivePage('myProjects')}
          >
            My Projects
          </NavButton>
          <NavButton 
            active={activePage === 'notifications'} 
            onClick={() => setActivePage('notifications')}
          >
            Notifications
          </NavButton>
          <NavButton 
            active={activePage === 'deadlines'} 
            onClick={() => setActivePage('deadlines')}
          >
            Deadlines
          </NavButton>
        </div>

        <div className='bg-white rounded-lg shadow-sm p-4'>
          {renderActivePage()}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default StudentDashboard; 