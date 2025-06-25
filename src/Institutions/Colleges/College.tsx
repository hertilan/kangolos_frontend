import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch, FaPlus, FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import School from '../Schools/School';
import AddCollege from './AddCollege';
import EditCollege from './EditCollege';
import { API_URL } from '../../config/api';

interface College {
  id: string;
  name: string;
  location: string;
  description: string;
  schools: string[];
  director: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    gender?: string;
  };
}

interface CollegeProps {
  displayed: boolean;
  universityName: string;
  universityId: string;
}

const Colleges: React.FC<CollegeProps> = ({ displayed, universityName, universityId }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSchools, setShowSchools] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addCollege, setAddCollege] = useState(false);
  const [editCollege, setEditCollege] = useState<College | null>(null);

useEffect(() => {
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/college/${universityId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Update this line to match your API response structure
      setColleges(data.college || []); // Use data.college instead of data.colleges
    } catch (err) {
      console.error('Error fetching colleges:', err);
      setError('Failed to fetch colleges. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchColleges();
}, [universityId]);

  const filteredColleges = colleges.filter(college =>
    Object.values(college).some(val => 
      val && typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleCollegeClick = (college: College) => {
    setSelectedCollege(college);
    setShowSchools(true);
  };

  const handleBackToColleges = () => {
    setShowSchools(false);
    setSelectedCollege(null);
  };

  const handleDeleteCollege = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/college/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete college');

      setColleges(colleges.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting college:', err);
      setError('Failed to delete college. Please try again.');
    }
  };

  if (loading) {
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
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
        >
          <p>{error}</p>
          <button onClick={() => setError('')} className="ml-auto font-bold">×</button>
        </motion.div>
      )}

      <AnimatePresence>
        {(editCollege || addCollege) && (
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
              {editCollege ? (
                <EditCollege
                  onClose={() => setEditCollege(null)}
                  universityId={universityId}
                  name={selectedCollege?.name}
                  description={selectedCollege?.description}
                  location={selectedCollege?.location}
                />
              ) : (
                <AddCollege 
                  onClose={() => setAddCollege(false)}
                  UniversityId={universityId}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSchools && selectedCollege ? (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <button 
            onClick={handleBackToColleges}
            className="flex items-center gap-2 mb-6 text-[#00628B] hover:text-[#3d94bd] transition-colors"
          >
            <FaChevronLeft />
            Back to Colleges
          </button>
          <School 
            collegeId={selectedCollege.id}
            collegeName={selectedCollege.name} 
            viewAddSchool={true}
          />
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-2xl md:text-3xl font-bold text-gray-800"
            >
              {universityName} Colleges
            </motion.h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search colleges..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAddCollege(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#00628B] text-white rounded-lg hover:bg-[#3d94bd] transition-colors shadow-sm"
              >
                <FaPlus /> Add College
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Location', 'Director', 'Schools', 'Description', 'Actions'].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredColleges.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      {colleges.length === 0 ? 'No colleges available' : 'No matching colleges found'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredColleges.map((college) => (
                      <motion.tr
                        key={college.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.name}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.location}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.director.firstName} {college.director.lastName}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.schools.length}
                        </td>
                        <td 
                          className="px-6 py-4 text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.description || 'No description'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditCollege(college);
                              }}
                              title="Edit college"
                            >
                              <FaUserEdit size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCollege(college.id);
                              }}
                              title="Delete college"
                            >
                              <MdDelete size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>     
  );
};

export default Colleges; 