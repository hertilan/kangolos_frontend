import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { CgClose } from 'react-icons/cg'
import ViewStudents from './ViewStudents'
import AllUsers from './AllUsers'
import ViewStaffs from './ViewStaffs'
import AddUser from './AddUser'

const Users: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [role, setRole] = useState<string>('all')
  const [department, setDepartment] = useState<string>('all')
  const [activePage, setActivePage] = useState<string>('all')
  const [addUser, setAddUser] = useState<boolean>(false)

  const handleSetActive = (page: string) => setActivePage(page)
  const toggleAddUser = () => setAddUser(prev => !prev)

  return (
<div className="w-full right-0 grid grid-cols-1 gap-3 p-2 relative">
  <h1 className="text-2xl font-bold">User Management</h1>

  {addUser && (
    <div className="absolute top-0 left-0 w-full h-screen z-50 grid place-items-center bg-gray-500/60 bg-opacity-30">
      <div className="bg-white p-4 rounded shadow-md relative w-full max-w-3xl mx-auto ">
        <button
          onClick={toggleAddUser}
          aria-label="Close add user form"
          className="absolute top-2 right-2 text-red-500 hover:text-red-400 cursor-pointer hover:scale-110 transition-transform"
        >
          <CgClose size={20} />
        </button>
        <AddUser />
      </div>
    </div>
  )}
      <div className='flex flex-row justify-center  bg-white w-fit justify-self-end'>
        <div className='relative'>
          <input
            type='text'
            name='search'
            aria-label='Search users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search users...'
            className='border-1 border-gray-400 px-6 p-2 rounded-l-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-80'
          />
          <button className='absolute left-0 top-2' aria-label='Search by name'>
            <BiUser size={20} />
          </button>
        </div>

        <select
          name='role'
          aria-label='Filter by role'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='border border-gray-400 p-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-60'
        >
          <option value='all'>All roles</option>
          <option value='Students'>Students</option>
          <option value='Supervisors'>Supervisors</option>
        </select>

        <select
          name='department'
          aria-label='Filter by department'
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className='border border-gray-400 p-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-60'
        >
          <option value='all'>All departments</option>
          <option value='IT'>IT</option>
          <option value='HR'>HR</option>
        </select>
        <button className='flex flex-row items-center text-white bg-[#00628B] rounded-r-sm cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out px-2 py-1'>Search</button>
      </div>
      <div className='w-full flex flex-row justify-between mt-4'>
      <div className='w-fit px-2 py-1 gap-4 flex flex-row border border-gray-300 text-gray-600'>
        <button
          className={`px-4 ${activePage === 'all' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('all')}
        >
          All users
        </button>
        <button
          className={`px-4 ${activePage === 'students' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('students')}
        >
          Students
        </button>
        <button
          className={`px-4 ${activePage === 'staff' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('staff')}
        >
          Staffs
        </button>
        <button
          className={`px-4 ${activePage === 'hods' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('hods')}>
          Hod
        </button>
        <button
          className={`px-4 ${activePage === 'deens' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('deens')}>
          Deens
        </button>
        <button
          className={`px-4 ${activePage === 'principal' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md' : ''} cursor-pointer transition-colors duration-300 ease-in-out`}
          onClick={() => handleSetActive('principal')}>
          Principals
        </button>
      </div>
      <button onClick={toggleAddUser} className='flex flex-row items-center px-5 py-1 h-fit text-white bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out'>
      <FaPlus size={20} className='mr-1' />
        Add new user
      </button>
      </div>

      {activePage === 'students' ? (
        <ViewStudents search={search} role={role} department={department} />
      ) : activePage === 'all' ? (
        <AllUsers search={search} role={role} department={department} />
      ) : (
        <ViewStaffs search={search} role={role} department={department} />
      )}
    </div>
  )
}

export default Users;
