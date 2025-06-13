import React, { useState } from 'react'
import Piechart from './Projects/Piechart'
import Barchart from './Projects/Barchart'
import Userspiechart from './Users/Userspiechart'
import Usersbarchart from './Users/Usersbarchart'
import Teamspiechart from './Teams/Teamspiechart'
import Teamsbarchart from './Teams/Teamsbarchart'
import Total from './Total'

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Projects')
  
  const tabs = [
    { id: 'Projects', label: 'Projects Analytics' },
    { id: 'Users', label: 'User Analytics' },
    { id: 'Teams', label: 'Active Teams' }
  ]

  return (
    <div className='w-full p-6 space-y-6'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-bold text-gray-800'>Admin Dashboard</h1>
        <p className='text-gray-600'>Welcome back, Admin. Here's an overview of the system</p>
      </div>
      
      <Total />
      
      {/* Tab Navigation */}
      <div className='flex space-x-1 p-1 bg-gray-100 rounded-lg w-fit'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Charts Container */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {activeTab === 'Projects' ? (
          <>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Piechart />
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Barchart />
            </div>
          </>
        ) : activeTab === 'Users' ? (
          <>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Userspiechart />
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Usersbarchart />
            </div>
          </>
        ) : (
          <>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Teamspiechart />
            </div>
            <div className='bg-white p-4 rounded-xl shadow-sm'>
              <Teamsbarchart />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard