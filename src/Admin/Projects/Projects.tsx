import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import AllProjects from './AllProjects';
import RejectedProjects from './RejectedProjects';
import CompletedProjects from './CompletedProject';

const Projects :React.FC= () => {
      const [search, setSearch] = useState<string>('')
      const [status, setStatus] = useState<string>('all')
      const [activePage,setActivePage] = useState<string>('all')

       const handleSetActive = (page: string) => setActivePage(page)

  return (
    <div  className="min-w-full right-0 grid grid-cols-1 justify-items-start gap-3 p-2">
    <h1 className="text-2xl font-bold">Project Management</h1>
      <div className='flex flex-row justify-center  bg-white w-fit justify-self-end'>
        <div className='relative'>
          <input
            type='text'
            name='search'
            aria-label='Search users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search projects...'
            className='border-1 border-gray-400 px-6 p-2 rounded-l-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-80'
          />
          <button className='absolute left-0 top-2 text-gray-500' aria-label='Search by name'>
            <IoMdSearch size={23} />
          </button>
        </div>

        <select
          name='role'
          aria-label='Filter by role'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='border border-gray-400 p-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-60'
        >
          <option value='all'disabled>All Statuses</option>
          <option value='Completed'>Completed</option>
          <option value='Pending'>Pending</option>
          <option value='Rejected'>Rejected</option>
        </select>
        <button className='flex flex-row items-center text-white bg-[#00628B] rounded-r-sm cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out px-2 py-1'>Search</button>
      </div>
        <div className='w-fit px-2 py-1 mt-4 gap-4 flex flex-row border border-gray-300 text-gray-600'>
        <button
          className={`px-4 ${activePage === 'all' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('all')}
        >
          All Projects
        </button>
        <button
          className={`px-4 ${activePage === 'Completed' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('Completed')}
        >
          Completed
        </button>
        <button
          className={`px-4 ${activePage === 'Rejected' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md ' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('Rejected')}
        >
          Rejected
        </button>
      </div>
        {activePage === 'all' ? (
        <AllProjects/>
      ) : activePage === 'Completed' ? (
        <CompletedProjects/>
      ) : (
        <RejectedProjects/>
      )}
    </div>
  )
}

export default Projects
