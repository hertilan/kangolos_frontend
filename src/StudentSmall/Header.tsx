import React, { useState, useEffect, useRef } from 'react';
import { IoIosSearch, IoIosMenu, IoIosClose, IoIosArrowDown } from "react-icons/io";
import { IoNotificationsOutline, IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

interface ShowStudent{
    onClose: boolean;
}

const Header: React.FC <ShowStudent>= () => {
    const [searchText, setSearchText] = useState<string>('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const navigate = useNavigate();
    const headerRef = useRef<HTMLElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        navigate('/');
    };

    return (
        <header 
            ref={headerRef}
            className={`w-full bg-[#00628B] text-gray-200 sticky top-0 z-50 transition-all duration-300 ${
                hasScrolled ? 'shadow-lg py-0' : 'shadow-md py-2'
            }`}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='flex items-center justify-between w-full md:w-auto py-2 md:py-0'>
                        {/* Logo */}
                        <Link 
                            to='/' 
                            className='text-xl font-bold hover:text-white transition-colors whitespace-nowrap'
                        >
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
                    <nav 
                        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block flex-1 w-full md:w-auto`}
                        aria-label="Main navigation"
                    >
                        <ul className='flex flex-col md:flex-row items-center gap-1 md:gap-4 lg:gap-6 pb-4 md:pb-0'>
                            <li className='w-full md:w-auto'>
                                <Link 
                                    to='/student/projects' 
                                    className='block hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Browse Projects
                                </Link>
                            </li>
                            {/* <li className='w-full md:w-auto'>
                                <Link 
                                    to='/student' 
                                    className={`${onClose ? 'block' : 'hidden'} hover:text-green-400 transition-colors px-3 py-2 rounded hover:bg-white/10 text-center md:text-left`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Students
                                </Link>
                            </li> */}
                        </ul>
                    </nav>

                    {/* Search and User Area */}
                    <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center gap-4 w-full md:w-auto pb-4 md:pb-0`}>
                        {/* Search Bar - shown only on md+ screens when menu is closed */}
                        <div className='relative flex-1 md:flex-none hidden md:block'>
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

                        {/* Mobile search button - shown only when mobile menu is open */}
                        {mobileMenuOpen && (
                            <div className='relative flex-1 md:hidden'>
                                <input 
                                    type='text' 
                                    name='search' 
                                    value={searchText} 
                                    placeholder='Search...' 
                                    onChange={(e) => setSearchText(e.target.value.trim())}
                                    className='border border-gray-400 pl-10 pr-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300 w-full'
                                    aria-label='Search projects'
                                />
                                <IoIosSearch 
                                    size={20} 
                                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 pointer-events-none'
                                />
                            </div>
                        )}

                        {/* Notification and Profile */}
                        <div className='flex items-center gap-4 ml-auto md:ml-0'>
                            <button 
                                className='p-1 hover:text-green-400 transition-colors relative'
                                aria-label='Notifications'
                            >
                                <IoNotificationsOutline size={24} />
                                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center'>
                                    3
                                </span>
                            </button>
                            
                            {/* Profile Dropdown */}
                            <div className='relative'>
                                <button 
                                    className='flex items-center gap-2 hover:text-green-400 transition-colors'
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    aria-label="User menu"
                                    aria-expanded={profileMenuOpen}
                                >
                                    <div className='w-8 h-8 rounded-full bg-gray-300 overflow-hidden border-2 border-white flex-shrink-0'>
                                        {/* Profile image would go here */}
                                    </div>
                                    <span className='hidden lg:inline'>Student</span>
                                    <IoIosArrowDown 
                                        className={`transition-transform duration-200 ${profileMenuOpen ? 'transform rotate-180' : ''}`}
                                    />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {profileMenuOpen && (
                                    <div 
                                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                                    >
                                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                                            Signed in as <span className="font-medium">Student</span>
                                        </div>
                                        <button 
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-150"
                                            onClick={() => {
                                                navigate('/settings');
                                                setProfileMenuOpen(false);
                                            }}
                                        >
                                            <IoSettingsOutline className="mr-3 text-gray-500" />
                                            Settings
                                        </button>
                                        <button 
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition-colors duration-150"
                                            onClick={() => {
                                                logout();
                                                setProfileMenuOpen(false);
                                            }}
                                        >
                                            <IoLogOutOutline className="mr-3 text-gray-500" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;