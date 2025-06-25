import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Piechart from './Projects/Piechart';
import Barchart from './Projects/Barchart';
import Userspiechart from './Users/Userspiechart';
import Usersbarchart from './Users/Usersbarchart';
import Teamspiechart from './Teams/Teamspiechart';
import Teamsbarchart from './Teams/Teamsbarchart';
import Total from './Total';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Projects');
  
  const tabs = [
    { id: 'Projects', label: 'Projects Analytics' },
    { id: 'Users', label: 'User Analytics' },
    { id: 'Teams', label: 'Active Teams' }
  ];

  const chartComponents = {
    Projects: [Piechart, Barchart],
    Users: [Userspiechart, Usersbarchart],
    Teams: [Teamspiechart, Teamsbarchart]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full p-4 md:p-6 lg:p-8 space-y-6'
    >
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className='space-y-2'
      >
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Admin Dashboard</h1>
        <p className='text-gray-600'>Welcome back, Admin. Here's an overview of the system</p>
      </motion.div>
      
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Total />
      </motion.div>
      
      {/* Tab Navigation */}
      <motion.div 
        className='flex overflow-x-auto pb-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className='flex space-x-1 p-1 bg-gray-100 rounded-lg'>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* Charts Container */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-6'
        >
          {chartComponents[activeTab as keyof typeof chartComponents].map((ChartComponent, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all'
            >
              <ChartComponent />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;