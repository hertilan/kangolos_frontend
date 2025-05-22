import React, { useState } from 'react'
import Piechart from './Piechart'
import Barchart from './Barchart'

const Dashboard :React.FC= () => {
    const [activePage, setActivePage] = useState<string>('Projects')
  return (
    <div className='grid grid-cols-1  gap-1 w-full text-[#000000]'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <p>Welcome back, Admin. Here's an overview of the system</p>
      <div className='flex flex-row gap-9 mt-5 w-full'>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Total Users</p>
            <p className='text-gray-100'>1248</p>
            <p className='text-[#2AD300]'>156% from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Total Projects</p>
            <p className='text-gray-100'>843</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>Active Teams</p>
            <p className='text-gray-100'>248</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        <div className='bg-[#00628B] flex flex-col gap-2 rounded-sm hover:scale-105 transition py-3 px-5 cursor-pointer'>
            <p className='text-[#808080]'>System Health</p>
            <p className='text-gray-100'>12%</p>
            <p className='text-[#2AD300]'>+156 from last semester</p>
        </div>
        
      </div>
      <div className='w-fit p-2 mt-4 gap-4 flex flex-row border border-gray-300 text-gray-600'>
        <h1 className={`${activePage === 'Projects' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('Projects')
        }}>Projects analytics</h1>
        <h1 className={`${activePage === 'Users' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('Users')
        }}>User analytics</h1>
        <h1 className={`${activePage === 'Teams' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('Teams')
        }}>active Teams</h1>
      </div>
      <div className='w-full'>
        { activePage === 'Projects' ? 
        <div className='flex flex-row gap-2'>
        <Piechart/>
        <Barchart/>
        </div>
        : ''
        }
      </div>
    </div>
  )
}

export default Dashboard
