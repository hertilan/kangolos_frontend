import React, { useState } from 'react'
import Header from '../StudentSmall/Header'
import Footer from '../Components/Footer'
import { FaPlus } from "react-icons/fa6";
import { CiFileOn } from "react-icons/ci";
import { Link } from 'react-router-dom';
import Myprojects from '../StudentSmall/Myprojects';
import Notifications from './Notifications';
import DeadLines from '../StudentSmall/DeadLines';

const StudentDashboard :React.FC= () => {
  const [activePage,setActivePage] = useState<string>('myProjects')
  return (
    <div className='h-screen w-screen flex flex-col text-gray-200'>
      <Header/>
      <div className='p-5 w-full'>
        <h1 className='text-black text-2xl'>Dashboard </h1>
        <p className='text-gray-400'>Welcome back, John</p>
        <Link to='create-project' className='flex flex-row justify-self-end bg-[#00628B] px-4 p-1.5 rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out mt-[-50px]'>
          <FaPlus size={25}/>
          Submit new project</Link>
      </div>
      <div className='w-full p-5 grid grid-cols-4 gap-5 '>
        <div className='grid justify-items-center pb-5 bg-[#1A3753] rounded-md '>
          <CiFileOn size={25} className='justify-self-end text-[#2C4FFF]'/>
          <p className='text-gray-400'>Active projects</p>

          <h1>1</h1>
        </div>
                <div className='grid justify-items-center pb-5 bg-[#1A3753] rounded-md '>
          <CiFileOn size={25} className='justify-self-end text-[#2C4FFF]'/>
          <p className='text-gray-400'>Rejected</p>

          <h1>4</h1>
        </div>
                <div className='grid justify-items-center pb-5 bg-[#1A3753] rounded-md '>
          <CiFileOn size={25} className='justify-self-end text-[#2C4FFF]'/>
          <p className='text-gray-400'>Academic Year</p>

          <h1>Year Four</h1>
        </div>
                <div className='grid justify-items-center pb-5 bg-[#1A3753] rounded-md hover:shadow-lg'>
          <CiFileOn size={25} className='justify-self-end text-[#2C4FFF]'/>
          <p className='text-gray-400'>Department</p>

          <h1>Computer Science</h1>
        </div>

      </div>
      <div className='flex flex-row gap-5 w-fit p-2 border border-gray-400 text-gray-600 mx-5 rounded-sm'>
        <h1 className={`${activePage === 'myProjects' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('myProjects')
        }}>My projects</h1>
        <h1 className={`${activePage === 'notifications' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('notifications')
        }}>Notifications</h1>
        <h1 className={`${activePage === 'deadlines' ? 'text-[#2C4FFF] bg-[#d2d8f7] rounded-md':''} px-4 cursor-pointer`} onClick={()=>{
          setActivePage('deadlines')
        }}>Deadlines</h1>
      </div>
      <div>
      { activePage === 'myProjects' ? 
      <Myprojects/> : 
      activePage === 'notifications' ? 
      <Notifications/> :
      <DeadLines/>

      }
      </div>
      <Footer/>
    </div>
  )
}

export default StudentDashboard