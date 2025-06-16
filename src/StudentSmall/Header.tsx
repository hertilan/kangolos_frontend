import React, { useState } from 'react'
import { IoIosSearch, IoIosMenu, IoIosClose } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <header className='w-full bg-[#00628B] text-gray-200 p-4 sticky top-0 z-50 shadow-md'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='flex items-center justify-between w-full md:w-auto'>
                    {/* Logo */}
                    <Link to='/' className='text-xl font-bold hover:text-white transition-colors'>
                        Kangalos
                    </Link>

                    {/* Mobile menu button */}
                    <button 
                        className='md:hidden p-2 text-gray-200 hover:text-white focus:outline-none'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <IoIosClose size={24} /> : <IoIosMenu size={24} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block flex-1 w-full md:w-auto`}>
                    <ul className='flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6'>
                        <li className='w-full md:w-auto'>
                            <Link 
                                to='/admin' 
                                className='block hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link 
                                to='/student/projects' 
                                className='block hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Browse Projects
                            </Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link 
                                to='/student' 
                                className='block hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Students
                            </Link>
                        </li>
                        <li className='w-full md:w-auto'>
                            <Link 
                                to='/student/team' 
                                className='block hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left'
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                My Team
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Search and User Area */}
                <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
                    {/* Search Bar */}
                    <div className='relative flex-1 md:flex-none'>
                        <input 
                            type='text' 
                            name='search' 
                            value={searchText} 
                            placeholder='Search Projects...' 
                            onChange={(e) => setSearchText(e.target.value.trim())}
                            className='border border-gray-400 pl-10 pr-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300 w-full md:w-48 lg:w-56'
                            aria-label='Search projects'
                        />
                        <IoIosSearch 
                            size={20} 
                            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none'
                        />
                    </div>

                    {/* Notification and Profile */}
                    <div className='flex items-center gap-3'>
                        <button 
                            className='p-1 hover:text-green-400 transition-colors relative'
                            aria-label='Notifications'
                        >
                            <IoNotificationsOutline size={24} />
                            <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
                                3
                            </span>
                        </button>
                        
                        <div className='w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white'>
                            {/* Profile image would go here */}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;