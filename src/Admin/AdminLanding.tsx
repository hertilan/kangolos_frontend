import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { LuLayoutDashboard, LuLogs, LuProjector } from 'react-icons/lu';
import { FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import { TbBrandTeams } from 'react-icons/tb';
import { MdSecurity } from 'react-icons/md';
import { FcTreeStructure } from 'react-icons/fc';
import { CiSettings } from 'react-icons/ci';
import { CgLogOut } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users/Users';
import Teams from './Teams/Teams';
import Projects from './Projects/Projects';
import AdminSettings from './AdminSettings';

const AdminLanding: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard size={23} /> },
    { name: 'Users', icon: <FaUsers size={23} /> },
    { name: 'Projects', icon: <LuProjector size={23} /> },
    { name: 'Teams', icon: <TbBrandTeams size={23} /> },
    { name: 'Structure', icon: <FcTreeStructure size={23} /> },
    { name: 'Logs', icon: <LuLogs size={23} /> },
    { name: 'Security', icon: <MdSecurity size={23} /> },
    { name: 'Settings', icon: <CiSettings size={23} /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard': return <Dashboard />;
      case 'Users': return <Users />;
      case 'Teams': return <Teams />;
      case 'Projects': return <Projects />;
      case 'Settings': return <AdminSettings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row'>
      {/* Mobile Menu Button */}
      <div className='lg:hidden flex justify-between items-center p-4 bg-[#1A3753] text-white'>
        <img src={logo} alt='logo' className='w-24 h-auto' />
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='text-2xl focus:outline-none'
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Left Navigation - Hidden on mobile unless menu is open */}
      <div 
        className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block lg:h-screen w-full lg:w-64 text-gray-300 flex flex-col gap-3 bg-[#1A3753] p-4 lg:p-6`}
      >
        <img src={logo} alt='logo' className='hidden lg:block mb-8 w-full h-auto max-h-20 object-contain' />
        
        <div className='flex flex-col gap-2'>
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`flex flex-row items-center gap-4 p-3 rounded-md cursor-pointer transition-colors ${
                activePage === item.name 
                  ? 'bg-white text-[#00628B]' 
                  : 'hover:bg-[#2a4a6e]'
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <h1 className='text-sm lg:text-base'>{item.name}</h1>
            </div>
          ))}
        </div>

        <div className='mt-auto'>
          <Link 
            to='/student' 
            className='flex flex-row items-center gap-4 p-3 rounded-md bg-red-200/20 hover:bg-red-200/30 transition-colors'
          >
            <span className='text-sm lg:text-base'>admin@example.com</span>
            <CgLogOut size={20} />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50'>
        {/* Mobile Page Title */}
        <h1 className='lg:hidden text-2xl font-bold text-gray-800 mb-6'>
          {activePage}
        </h1>
        
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminLanding;