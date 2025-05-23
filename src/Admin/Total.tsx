import React from 'react'

const Total :React.FC= () => {
  return (
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
  )
}

export default Total


