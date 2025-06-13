import React, { useEffect, useState } from 'react';
import { FaUserEdit, FaSearch, FaSort } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Staff {
  _id: number;
  name: string;
  email: string;
  gender: string;
  role: string;
  college: string;
  school: string;
  department: string;
}

const ViewStaffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Staff; direction: 'ascending' | 'descending' } | null>(null);
  const staffsPerPage = 10;

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await fetch('https://www.kangalos.com/users/students');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStaffs(data);
        setFilteredStaffs(data);
      } catch (error) {
        console.error('Failed to fetch staffs:', error);
      }
    };

    fetchStaffs();
  }, []);

  useEffect(() => {
    const results = staffs.filter(staff =>
      Object.values(staff).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setFilteredStaffs(results);
    setCurrentPage(1);
  }, [searchTerm, staffs]);

  const handleSort = (key: keyof Staff) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedStaffs = [...filteredStaffs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setFilteredStaffs(sortedStaffs);
  };

  // Pagination logic
  const indexOfLastStaff = currentPage * staffsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
  const currentStaffs = filteredStaffs.slice(indexOfFirstStaff, indexOfLastStaff);
  const totalPages = Math.ceil(filteredStaffs.length / staffsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="w-full p-6 space-y-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['_id', 'name', 'email', 'gender', 'role', 'college', 'school', 'department', 'action'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => header !== 'action' ? handleSort(header as keyof Staff) : null}
                >
                  <div className="flex items-center">
                    {header.replace('_', ' ')}
                    {header !== 'action' && (
                      <FaSort className="ml-1 text-gray-400 hover:text-gray-600" size={12} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStaffs.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                  {staffs.length === 0 ? 'Loading staff data...' : 'No matching staff found'}
                </td>
              </tr>
            ) : (
              currentStaffs.map((staff) => (
                <tr key={staff._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{staff.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{staff.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.college}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.school}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                      title="Edit staff"
                    >
                      <FaUserEdit size={18} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete staff"
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredStaffs.length > staffsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstStaff + 1} to {Math.min(indexOfLastStaff, filteredStaffs.length)} of {filteredStaffs.length} staff members
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStaffs;