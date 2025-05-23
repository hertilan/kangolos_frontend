import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import ViewStudents from './ViewStudents'
import AllUsers from './AllUsers'
import ViewStaffs from './ViewStaffs'

const Users :React.FC= () => {
  const [search,setSearch] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [department, setDepartment] = useState<string>('')
  const [activePage,setActivePage] =useState<string>('all')
  return (
    <div className='w-full right-0 grid grid-cols-1 gap-3 p-2'>
      <h1 className='text-2xl font-bold'>User management</h1>
      <div className='flex flex-row gap-3 min-w-full'>
        <div className='relative'>
        <input type='text' name='search' value={search} onChange={(e)=>{
          setSearch(e.target.value)
        }} placeholder='Search users...' className='border border-gray-400 px-6 p-1 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-80'/>
        <button className='absolute left-0 top-2'>
          <BiUser size={20}/>
        </button>
        </div>
        <select name='role' value={role} onChange={(e)=>{
          setRole(e.target.value)
        }} className='border border-gray-400  p-1 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-60'>
          <option value='all' selected> All roles </option>
          <option value='Students'>Students</option>
          <option value='Supervisors'>Supervisors</option>
        </select>
        <select name='role' value={department} onChange={(e)=>{
          setDepartment(e.target.value)
        }} className='border border-gray-400  p-1 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-60'>
          <option value='all' selected> All roles </option>
          <option value='Students'>Students</option>
          <option value='Supervisors'>Supervisors</option>
        </select>
      <Link to='/admin' className='flex flex-row text-gray-100 justify-self-end bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out px-2 py-1'>
          <FaPlus size={25}/>
          Add new user</Link>
      </div>
      <div className='w-fit px-2 py-1 mt-4 gap-4 flex flex-row border border-gray-300 text-gray-600'>
        <h1 className={`${activePage === 'all' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('all')
        }}>All users</h1>
        <h1 className={`${activePage === 'students' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('students')
        }}>Students</h1>
        <h1 className={`${activePage === 'staff' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('staff')
        }}>Staffs</h1>
      </div>
      {activePage === 'students' ?
      <ViewStudents/>
      :
      activePage === 'all' ?
      <AllUsers/>
      :
      <ViewStaffs/>

      }
    </div>
  )
}

export default Users
