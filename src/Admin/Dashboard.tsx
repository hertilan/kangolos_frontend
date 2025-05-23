import React, { useState } from 'react'
import Piechart from './Piechart'
import Barchart from './Barchart'
import Userspiechart from './Userspiechart'
import Usersbarchart from './Usersbarchart'
import Teamspiechart from './Teamspiechart'
import Teamsbarchart from './Teamsbarchart'
import Total from './Total'

const Dashboard :React.FC= () => {
    const [activePage, setActivePage] = useState<string>('Projects')
  return (
    <div className='grid grid-cols-1 p-2  gap-1 w-full text-[#000000]'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <p>Welcome back, Admin. Here's an overview of the system</p>
     <Total/>
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
        :
        activePage === 'Users' ? 
        <div className='flex flex-row gap-2'>
            <Userspiechart/>
            <Usersbarchart/>
        </div>
        : 
        <div className='flex flex-row gap-2'>
            <Teamspiechart/>
            <Teamsbarchart/>
        </div>
        }
      </div>
    </div>
  )
}

export default Dashboard
