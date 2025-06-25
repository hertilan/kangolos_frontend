import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch, FaPlus, FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import Department from '../Departments/Department';
import AddSchool from './AddSchool';
import EditSchool from './EditSchool';
import { API_URL } from '../../config/api';

interface Dean {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: string;
}

interface School {
  id: string;
  name: string;
  description: string;
  dean: Dean;
  departmentsCount: number;
}

interface SchoolProps {
  collegeId: string;
  viewAddSchool: boolean;
  collegeName: string;
  onSchoolAction?: () => void;
}

const School: React.FC<SchoolProps> = ({ collegeId, collegeName, viewAddSchool, onSchoolAction }) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showDepartments, setShowDepartments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addSchoolModal, setAddSchoolModal] = useState(false);
  const [editSchoolModal, setEditSchoolModal] = useState<School | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(
        `${API_URL}/admin/school/${collegeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        }
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch schools');
      }

      const data = await response.json();
      
      // Handle backend response structure
      const schoolsData = data.school || [];
      
      if (!Array.isArray(schoolsData)) {
        throw new Error('Invalid schools data received');
      }

      const formattedSchools = schoolsData.map((school: any) => ({
        id: school.id,
        name: school.name,
        description: school.description,
        dean: {
          id: school.dean.id,
          firstName: school.dean.firstName,
          lastName: school.dean.lastName,
          email: school.dean.email,
          phone: school.dean.phone,
          gender: school.dean.gender
        },
        departmentsCount: school.departmentsCount || 0
      }));

      setSchools(formattedSchools);
      setError('');
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch schools');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [collegeId]);

  const handleAddSchoolSuccess = () => {
    setAddSchoolModal(false);
    fetchSchools();
    onSchoolAction?.();
  };

  const handleUpdateSchool = async (updatedSchool: School) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/admin/schools/${updatedSchool.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          name: updatedSchool.name,
          description: updatedSchool.description,
          deanId: updatedSchool.dean.id
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update school');
      }

      await fetchSchools();
      setEditSchoolModal(null);
      onSchoolAction?.();
    } catch (err) {
      console.error('Error updating school:', err);
      setError(err instanceof Error ? err.message : 'Failed to update school');
    }
  };

  const handleDeleteSchool = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this school and all its departments?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/admin/schools/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete school');
      }

      setSchools(schools.filter(school => school.id !== id));
      onSchoolAction?.();
    } catch (err) {
      console.error('Error deleting school:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete school');
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${school.dean.firstName} ${school.dean.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.dean.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && schools.length === 0) {
    return (
      <div className="w-full p-6 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00628B]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full p-4 md:p-6 space-y-6 bg-white rounded-xl shadow-sm"
    >
      {error && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex justify-between"
        >
          <p>{error}</p>
          <button onClick={() => setError('')} className="font-bold">×</button>
        </motion.div>
      )}

      <AnimatePresence>
        {addSchoolModal && (
          <AddSchool 
            onClose={() => setAddSchoolModal(false)}
            onSuccess={handleAddSchoolSuccess}
            collegeId={collegeId}
            collegeName={collegeName}
          />
        )}

        {editSchoolModal && (
          <EditSchool 
            onClose={() => setEditSchoolModal(null)}
            onSave={handleUpdateSchool}
            school={editSchoolModal}
            collegeName={collegeName}
          />
        )}
      </AnimatePresence>

      {showDepartments && selectedSchool ? (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-4"
        >
          <button 
            onClick={() => {
              setShowDepartments(false);
              setSelectedSchool(null);
            }}
            className="flex items-center gap-2 mb-6 text-[#00628B] hover:text-[#3d94bd] transition-colors"
          >
            <FaChevronLeft />
            Back to schools
          </button>
          
          <Department 
            schoolId={selectedSchool.id}
            schoolName={selectedSchool.name} 
          />
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {collegeName} - Schools
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search schools..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {viewAddSchool && (
                <button
                  onClick={() => setAddSchoolModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00628B] text-white rounded-lg hover:bg-[#3d94bd] transition-colors"
                >
                  <FaPlus /> Add School
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dean</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departments</th>
                  {viewAddSchool && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={viewAddSchool ? 5 : 4} className="px-6 py-8 text-center text-gray-500">
                      {schools.length === 0 ? 'No schools available' : 'No matching schools found'}
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer hover:text-[#00628B]"
                        onClick={() => {
                          setSelectedSchool(school);
                          setShowDepartments(true);
                        }}
                      >
                        {school.name}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-[#00628B]"
                        onClick={() => {
                          setSelectedSchool(school);
                          setShowDepartments(true);
                        }}
                      >
                        {school.dean.firstName} {school.dean.lastName}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-[#00628B]"
                        onClick={() => {
                          setSelectedSchool(school);
                          setShowDepartments(true);
                        }}
                      >
                        {school.dean.email}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-[#00628B]"
                        onClick={() => {
                          setSelectedSchool(school);
                          setShowDepartments(true);
                        }}
                      >
                        {school.departmentsCount}
                      </td>
                      {viewAddSchool && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditSchoolModal(school);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                              title="Edit school"
                            >
                              <FaUserEdit size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSchool(school.id);
                              }}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                              title="Delete school"
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default School;