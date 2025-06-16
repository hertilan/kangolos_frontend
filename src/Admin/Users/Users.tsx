import React, { useState } from 'react';
import { BiUser, BiSearch } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import ViewStudents from './ViewStudents';
import AllUsers from './AllUsers';
import ViewStaffs from './ViewStaffs';
import AddUser from './AddUser';

const Users: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<string>('all');
  const [department, setDepartment] = useState<string>('all');
  const [activePage, setActivePage] = useState<string>('all');
  const [addUser, setAddUser] = useState<boolean>(false);

  const handleSetActive = (page: string) => setActivePage(page);
  const toggleAddUser = () => setAddUser(prev => !prev);

  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'students', label: 'Students' },
    { id: 'staff', label: 'Staff' },
    { id: 'hods', label: 'HODs' },
    { id: 'deens', label: 'Deans' },
    { id: 'principal', label: 'Principals' }
  ];

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
        
        {/* Add User Button - Mobile First */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleAddUser}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 self-end md:self-auto"
        >
          <FaPlus className="mr-2" />
          <span className="whitespace-nowrap">Add New User</span>
        </motion.button>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {addUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={toggleAddUser}
                aria-label="Close add user form"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <IoClose size={24} />
              </button>
              <div className="p-6">
                <AddUser />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              aria-label="Search users"
            />
          </div>

          {/* Role Filter */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="Students">Students</option>
            <option value="Supervisors">Supervisors</option>
          </select>

          {/* Department Filter */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            aria-label="Filter by department"
          >
            <option value="all">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
          </select>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Search
          </motion.button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSetActive(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors duration-300 ${
                activePage === tab.id
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {activePage === 'students' ? (
          <ViewStudents search={search} role={role} department={department} />
        ) : activePage === 'all' ? (
          <AllUsers search={search} role={role} department={department} />
        ) : (
          <ViewStaffs search={search} role={role} department={department} />
        )}
      </div>
    </div>
  );
};

export default Users;