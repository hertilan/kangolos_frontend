import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import Users from './Users/Users'
import Teams from './Teams/Teams'
import Projects from './Projects/Projects'
import AdminSettings from './AdminSettings'

const testimonials = [
  {
    id: 1,
    name: "Dr. Alice Uwase",
    role: "Head of Computer Science",
    text: "This system has revolutionized how we manage student projects. The efficiency gains are remarkable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Prof. John Mugisha",
    role: "Dean of Engineering",
    text: "The analytics dashboard provides invaluable insights into project progress across all departments.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Marie Kamanzi",
    role: "Research Coordinator",
    text: "Our faculty can now track student progress in real-time, making supervision much more effective.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const AdminLanding: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Dashboard')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Animated icons data
  const animatedIcons = [
    { icon: <LuLayoutDashboard size={23} />, y: [0, -10, 0] },
    { icon: <FaUsers size={23} />, y: [0, -15, 0] },
    { icon: <LuProjector size={23} />, y: [0, -8, 0] },
    { icon: <TbBrandTeams size={23} />, y: [0, -12, 0] },
    { icon: <FcTreeStructure size={23} />, y: [0, -10, 0] },
    { icon: <LuLogs size={23} />, y: [0, -15, 0] },
    { icon: <MdSecurity size={23} />, y: [0, -8, 0] },
    { icon: <CiSettings size={23} />, y: [0, -12, 0] }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
        setIsAnimating(false)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='h-fit w-screen flex flex-row bg-gray-50'>
      {/* Left Navigation - Modernized */}
      <div className='h-screen w-64 text-gray-300 flex flex-col gap-3 bg-gradient-to-b from-[#1A3753] to-[#0D2035] p-4 sticky top-0 shadow-xl'>
        <div className='flex items-center justify-center mb-8'>
          <img src={logo} alt='logo' className='w-30 h-20 object-contain' />
        </div>
        
        {[
          { name: 'Dashboard', icon: 0 },
          { name: 'Users', icon: 1 },
          { name: 'Projects', icon: 2 },
          { name: 'Teams', icon: 3 },
          { name: 'Structure', icon: 4 },
          { name: 'Logs', icon: 5 },
          { name: 'Security', icon: 6 },
          { name: 'Settings', icon: 7 }
        ].map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
              activePage === item.name 
                ? 'bg-white text-[#00628B] shadow-md' 
                : 'hover:bg-[#2a4a6e]'
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <motion.div
              animate={{ y: animatedIcons[item.icon].y }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              {animatedIcons[item.icon].icon}
            </motion.div>
            <h1 className='text-sm font-medium'>{item.name}</h1>
          </motion.div>
        ))}

        <div className='mt-auto mb-4'>
          <Link 
            to='/student' 
            className='flex items-center justify-between gap-2 p-3 rounded-lg bg-[#2a4a6e] hover:bg-[#3a5a7e] transition-all'
          >
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white'>
                {localStorage.getItem('adminEmail')?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className='text-sm truncate'>
                {localStorage.getItem('adminEmail') || 'admin@example.com'}
              </span>
            </div>
            <CgLogOut size={18} className='text-gray-300' />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 h-screen overflow-y-auto'>
        {/* Header with animated testimonials */}
        <div className='bg-white shadow-sm p-4 sticky top-0 z-10'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-[#1A3753]'>{activePage}</h1>
            
            <div className='relative h-24 w-2/3 overflow-hidden rounded-lg bg-gradient-to-r from-[#1A3753] to-[#00628B]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={testimonials[currentTestimonial].id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ 
                    x: isAnimating ? -300 : 0, 
                    opacity: isAnimating ? 0 : 1 
                  }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className='absolute inset-0 flex items-center p-4 text-white'
                >
                  <div className='flex items-center space-x-4'>
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name}
                      className='w-12 h-12 rounded-full border-2 border-white'
                    />
                    <div>
                      <p className='italic'>"{testimonials[currentTestimonial].text}"</p>
                      <div className='mt-2'>
                        <p className='font-semibold'>{testimonials[currentTestimonial].name}</p>
                        <p className='text-sm text-white/80'>{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Page Content with smooth transitions */}
        <div className='p-6'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activePage === 'Dashboard' && <Dashboard />}
              {activePage === 'Users' && <Users />}
              {activePage === 'Teams' && <Teams />}
              {activePage === 'Projects' && <Projects />}
              {activePage === 'Settings' && <AdminSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AdminLanding