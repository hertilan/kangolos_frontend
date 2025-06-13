import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { LuLayoutDashboard, LuLogs, LuProjector } from 'react-icons/lu';
import { FaUsers, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { TbBrandTeams } from 'react-icons/tb';
import { MdSecurity, MdNotifications } from 'react-icons/md';
import { FcTreeStructure } from 'react-icons/fc';
import { CiSettings } from 'react-icons/ci';
import { CgLogOut, CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users/Users';
import Teams from './Teams/Teams';
import Projects from './Projects/Projects';
import AdminSettings from './AdminSettings';

const AdminLanding: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Dashboard', icon: <LuLayoutDashboard size={20} /> },
    { name: 'Users', icon: <FaUsers size={20} /> },
    { name: 'Projects', icon: <LuProjector size={20} /> },
    { name: 'Teams', icon: <TbBrandTeams size={20} /> },
    { name: 'Structure', icon: <FcTreeStructure size={20} /> },
    { name: 'Logs', icon: <LuLogs size={20} /> },
    { name: 'Security', icon: <MdSecurity size={20} /> },
    { name: 'Settings', icon: <CiSettings size={20} /> },
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
    <div className='min-h-screen w-full flex flex-col lg:flex-row bg-gray-50'>
      {/* Mobile Menu Button */}
      <div className='lg:hidden flex justify-between items-center  p-4 bg-indigo-700 text-white'>
        <img src={logo} alt='logo' className='w-24 h-auto' />
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='text-2xl focus:outline-none'
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Left Navigation */}
      <div 
        className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block min-h-screen lg:h-screen w-full lg:w-64 text-gray-200 flex flex-col gap-3 bg-indigo-700 p-4 lg:p-6 transition-all duration-300`}
      >
        <img src={logo} alt='logo' className='hidden lg:block mb-8 w-full h-auto max-h-20 object-contain' />
        
        <div className='flex flex-col gap-1'>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                activePage === item.name 
                  ? 'bg-white text-indigo-600 shadow-md' 
                  : 'hover:bg-indigo-600 hover:text-white'
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMobileMenuOpen(false);
              }}
            >
              <span className={`${activePage === item.name ? 'text-indigo-600' : 'text-gray-200'}`}>
                {item.icon}
              </span>
              <span className='text-sm lg:text-base font-medium'>{item.name}</span>
            </button>
          ))}
        </div>

        <div className='mt-auto pt-4 border-t border-indigo-600'>
          <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-600 transition-colors'>
            <div className='w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center'>
              <CgProfile className='text-white' size={18} />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium'>admin@example.com</p>
              <p className='text-xs text-indigo-200'>Administrator</p>
            </div>
            <CgLogOut className='text-gray-300 hover:text-white' size={18} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Top Bar */}
        <header className='bg-white shadow-sm p-4 lg:px-6 flex items-center justify-between'>
          <h1 className='text-xl font-bold text-gray-800 hidden lg:block'>
            {activePage}
          </h1>
          
          <div className='flex-1 lg:flex-none lg:w-96'>
            <div className='relative'>
              <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search users, projects...'
                className='w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className='flex items-center gap-4 ml-4'>
            <button className='p-2 rounded-full hover:bg-gray-100 relative'>
              <MdNotifications className='text-gray-600' size={20} />
              <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500'></span>
            </button>
            
            <div className='hidden lg:flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium'>
                A
              </div>
              <span className='text-sm font-medium text-gray-700'>Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50'>
          <h1 className='lg:hidden text-2xl font-bold text-gray-800 mb-6'>
            {activePage}
          </h1>
          
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminLanding;