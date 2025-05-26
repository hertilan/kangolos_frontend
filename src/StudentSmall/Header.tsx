import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Header :React.FC= () => {
    const [searchText,setSearchText] = useState<string>('')
  return (
    <div className='w-screen top-0 right-0 bg-[#00628B] text-gray-200 p-3 py-2 flex flex-row lg:gap-29 sticky'>
      <Link to ='/'>FYPMS</Link>
      <ul className='flex flex-row gap-10 '>

        <li className='hover:text-green-400 transition-colors duration-500 ease-in-out'><Link to ='/admin' className='cursor-pointer'>Dashboard</Link></li>
        <li className='hover:text-green-400 transition-colors duration-500 ease-in-out'><Link to='/student/projects' className='cursor-pointer'>My Projects</Link></li>
        <li className='hover:text-green-400 transition-colors duration-500 ease-in-out'><Link to ='/student' className='cursor-pointer'>Browser Projects</Link></li>
        <li className='hover:text-green-400 transition-colors duration-500 ease-in-out'><Link to ='/student/team' className='cursor-pointer'>My team</Link></li>

      </ul>
      <div className=' justify-self-end justify-items-end flex flex-row self-end gap-6 right-0'>
        <div className='relative'>
        <input type='text' name='search' value={searchText} placeholder='Search Projects...' onChange={(e)=>{
            setSearchText(e.target.value.trim())
        }} className='border border-gray-400 px-7 rounded-md py-1'/>
        <h1 className='absolute top-1.5 left-0'>
            <IoIosSearch size={23} className='cursor-pointer'/>
        </h1>
        </div>
        <IoNotificationsOutline size={30} className='cursor-pointer hover:text-green-400 transition-colors duration-500 ease-in-out'/>
        <div className='w-[35px] h-[35px] rounded-full bg-gray-300'></div>
      </div>
    </div>
  )
}

export default Header
