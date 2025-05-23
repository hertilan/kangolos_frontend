import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { LuLayoutDashboard, LuLogs, LuProjector } from 'react-icons/lu'
import { FaUsers } from 'react-icons/fa'
import { TbBrandTeams } from 'react-icons/tb'
import { MdAnalytics, MdBackup, MdSecurity } from 'react-icons/md'
import { FcTreeStructure } from 'react-icons/fc'
import { CiSettings } from 'react-icons/ci'
import { CgLogOut } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Users from './Users'
import Teams from './Teams'

const AdminLanding :React.FC= () => {
  const [activePage, setActivePage] = useState<string>('Dashboard')
  return (
    <div className='h-fit w-screen flex flex-row'>
      {/* Left Nav */}

      <div className='h-screen w-fit text-gray-300 flex flex-col gap-3 bg-[#1A3753] p-3'>
        <img src={logo} alt='logo' className='mb-8 w-30 h-20'/>
        <div className={`flex flex-row gap-4 ${activePage === 'Dashboard' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`}      onClick={()=>{
        setActivePage('Dashboard')
      }}>
          <LuLayoutDashboard size={23}/>
          <h1>Dashboard</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Users' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`} onClick={()=>{
        setActivePage('Users')
      }}>
          <FaUsers size={23}/>
          <h1>User Management</h1>
        </div>
        <div className={`flex flex-row gap-4  ${activePage === 'Projects' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`} onClick={()=>{
        setActivePage('Projects')
      }}>
        <LuProjector size={23}/>
        <h1>Projects</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Teams' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`}
        onClick={()=>{
        setActivePage('Teams')
      }}>
        <TbBrandTeams size={23}/>
        <h1>Teams</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Structure' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`}      onClick={()=>{
        setActivePage('Structure')
      }}>
          <FcTreeStructure size={23}/>
          <h1>University Structure</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Logs' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`} onClick={()=>{
        setActivePage('Logs')
      }}>
          <LuLogs size={23}/>
          <h1>System Logs</h1>
        </div>
        <div className={`flex flex-row gap-4  ${activePage === 'Analytics' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`} onClick={()=>{
        setActivePage('Analytics')
      }}>
        <MdAnalytics size={23}/>
        <h1>Analytics</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Security' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`}
        onClick={()=>{
        setActivePage('Security')
      }}>
        <MdSecurity size={23}/>
        <h1>Security</h1>
        </div>
        <div className={`flex flex-row gap-4 ${activePage === 'Settings' ? 'bg-white text-[#00628B]' : '' } p-1 rounded-sm cursor-pointer`}
        onClick={()=>{
        setActivePage('Settings')
      }}>
        <CiSettings size={23}/>
        <h1>Settings</h1>
        </div>
        <Link to='/student' className='bottom-0 flex flex-row gap-4 bg-red-200/20 p-1 rounded-sm'>
          <h1>
            admin@example.com
          </h1>
          <CgLogOut size={23}/>
        </Link>
      </div>

      {/* Right Nav */}

      <div className='h-screen overflow-y-auto'>
        { activePage === 'Dashboard' ? <Dashboard/>
        :
        activePage === 'Users' ? <Users/>
        : 
        activePage === 'Teams' ? <Teams/>
        :
        ''

        }
      </div>
    </div>
  )
}

export default AdminLanding
