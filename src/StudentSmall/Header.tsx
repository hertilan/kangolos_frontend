import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    
    return (
        <header className='w-full bg-[#00628B] text-gray-200 p-4 sticky top-0 z-50 shadow-md'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
                {/* Logo */}
                <Link to='/' className='text-xl font-bold hover:text-white transition-colors'>
                    FYPMS
                </Link>

                {/* Navigation */}
                <nav className='flex-1'>
                    <ul className='flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8'>
                        <li>
                            <Link 
                                to='/admin' 
                                className='hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-white/10'
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/student/projects' 
                                className='hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-white/10'
                            >
                                Browse Projects
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/student' 
                                className='hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-white/10'
                            >
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/student/team' 
                                className='hover:text-green-400 transition-colors px-2 py-1 rounded hover:bg-white/10'
                            >
                                My Team
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Search and User Area */}
                <div className='flex items-center gap-4'>
                    {/* Search Bar */}
                    <div className='relative'>
                        <input 
                            type='text' 
                            name='search' 
                            value={searchText} 
                            placeholder='Search Projects...' 
                            onChange={(e) => setSearchText(e.target.value.trim())}
                            className='border border-gray-400 pl-10 pr-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-300 w-40 sm:w-48 md:w-56'
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

export default Header