import React, { useState } from 'react'
import Header from '../StudentSmall/Header'
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const ViewProjects :React.FC= () => {
  const [activePage,setActivePage] = useState<string>('AllProjects')
  const [projectType, setProjectType] = useState<string>('All')
  return (
    <div className='w-full flex flex-col min-h-screen'>
      <Header/>
      <div className='w-full p-5 grid grid-cols-1 gap-7'>
        <div className='grid'>
        <Link to='/student' className='flex flex-row gap-2'>
        <FaArrowLeftLong size={25}/>
        <h1>Back to Dashboard</h1>
        </Link>
        <Link to='/student/create-project' className='flex flex-row right-0 text-white justify-self-end bg-[#00628B] px-4 p-2 rounded-md cursor-pointer hover:bg-[#3d94bd] mt-[-30px] transition-colors duration-500 ease-in-out'>
           <FaPlus size={25}/>
           Submit new project
        </Link>
        </div>
        <div className='mt-[-30px]'>
        <h1 className='font-bold text-[23px]'>My Projects</h1>
        <p className='text-gray-500 text-[15px]'>Manage and track your projects</p>
        </div>
        <div className='w-full flex flex-row justify-between'>
        <div className='flex flex-row gap-3 w-fit self-start p-2 border border-gray-400 text-gray-600 rounded-sm'>
          <h1 className={`${activePage === 'AllProjects' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
        setActivePage('AllProjects')
        }}>All Projects</h1>
          <h1 className={`${activePage === 'Reviews' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('Reviews')
        }}>Reviews</h1>
          <h1 className={`${activePage === 'Draft' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('Draft')
        }}>Drafts</h1>
        </div>

      <div className='flex flex-row gap-3 w-fit right-0 self-end p-2 border border-gray-400 text-gray-600 rounded-sm'>
      <h1 className={`${projectType === 'All' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
        setProjectType('All')
        }}>All</h1>
          <h1 className={`${projectType === 'Active' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setProjectType('Active')
        }}>Active</h1>
          <h1 className={`${projectType === 'Completed' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setProjectType('Completed')
        }}>Completed</h1>
        <h1 className={`${projectType === 'Rejected' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setProjectType('Rejected')
        }}>Rejected</h1>
        </div>
        </div>
      </div>

      
    </div>
  )
}

export default ViewProjects