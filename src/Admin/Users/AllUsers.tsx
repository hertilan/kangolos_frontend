import React, { useEffect, useState, useMemo } from 'react';
import { FaUserEdit, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AnimatePresence, motion } from 'framer-motion';
import EditUser from './EditUser';

interface User {
  _id: number;
  name: string;
  email: string;
  gender: string;
  role: string;
  referenceNumber: string;
  college: string;
  school: string;
  department: string;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const usersPerPage = 10;

    const sampleUsers: User[] = [
    {
      _id: 1,
      name: "Eric TUYISHIME",
      email: 'erictuyishime574@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of ICT",
      department: "Computer science",
    },
    
    {
      _id: 2,
      name: "Merci RUYANGA",
      email: 'ruyangam15@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of Engineering",
      department: "ETE",
    },
    {
      _id: 3,
      name: "Kayitsinga TUYISHIME",
      email: 'erictuyishime574@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of ICT",
      department: "Computer science",
    },
    {
      _id: 4,
      name: "Eric TUYISHIME",
      email: 'erictuyishime574@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of ICT",
      department: "Computer science",
    },
    {
      _id: 5,
      name: "Eric TUYISHIME",
      email: 'erictuyishime574@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of ICT",
      department: "Computer science",
    },
    {
      _id: 6,
      name: "Eric TUYISHIME",
      email: 'erictuyishime574@gmail.com',
      referenceNumber:'226444567',
      gender: "Male",
      role: 'Student',
      college: 'CST-Nyarugenge',
      school: "School of ICT",
      department: "Computer science",
    },
    // ... other sample colleges
  ];
  //  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  //   const handleCollegeClick = (user: User) => {
  //   setSelectedUser(user);
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://www.kangalos.com/users/users');
        const data = await response.json();
        setUsers(users.length >0 ? data : sampleUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
        setUsers(sampleUsers)
      } finally {
        setIsLoading(false);
        setUsers(sampleUsers)
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      Object.values(user).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;
    
    return [...filteredUsers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const handleSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const tableHeaders = [
    { key: '_id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'gender', label: 'Gender' },
    { key: 'role', label: 'Role' },
    { key: 'college', label: 'College' },
    { key: 'school', label: 'School' },
    { key: 'department', label: 'Department' },
    { key: 'action', label: 'Actions' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-sm">

        <AnimatePresence>
        {(editUser) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl"
            >
              <EditUser 
                onClose={() => editUser ? setEditUser(null) : ''} 
                id={editUser._id}
                name={editUser.name}
                email={editUser.email}
                referenceNumber={editUser.referenceNumber}
                gender={editUser.gender}
                role={editUser.role}
                college={editUser.college}
                school={editUser.school}
                department={editUser.department}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    header.key !== 'action' ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => header.key !== 'action' && handleSort(header.key as keyof User)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {header.key !== 'action' && (
                      <span className="ml-1">
                        {sortConfig?.key === header.key ? (
                          sortConfig.direction === 'ascending' ? (
                            <FaSortUp className="text-gray-600" size={12} />
                          ) : (
                            <FaSortDown className="text-gray-600" size={12} />
                          )
                        ) : (
                          <FaSort className="text-gray-400 hover:text-gray-600" size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.college}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.school}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"                               onClick={(e) => {
                                e.stopPropagation();
                                setEditUser(user);
                              }}>
                        <FaUserEdit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors">
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && sortedUsers.length > usersPerPage && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastUser, sortedUsers.length)}</span> of{' '}
            <span className="font-medium">{sortedUsers.length}</span> results
          </div>
          <div className="flex items-center space-x-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FiChevronLeft />
            </motion.button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <motion.button
                  key={pageNumber}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {pageNumber}
                </motion.button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(totalPages)}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {totalPages}
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              <FiChevronRight />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AllUsers;