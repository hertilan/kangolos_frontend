import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch, FaPlus, FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import EditUniversity from './EditUniversity';
import AddUniversity from './AddUniversity';
import Colleges from '../Colleges/College';
import { API_URL } from '../../config/api';


interface University {
  id: string;
  name: string;
  location: string;
  description: string;
  colleges: string[];
  collegesCount?: string;
}

interface addUniversityProp {
  displayed: boolean;
  viewAddSchool: boolean;
}

const University: React.FC<addUniversityProp> = ({ displayed, viewAddSchool }) => {

  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showColleges, setShowColleges] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addUniversity, setAddUniversity] = useState(false);
  const [editUniversity, setEditUniversity] = useState<University | null>(null);

useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/admin/university`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.university) { // Changed from AllUniversity to university
          const formattedUniversities = data.university.map((uni: any) => ({
            id: uni.id,
            name: uni.name,
            location: uni.location || 'Unknown', // Handle missing location
            description: uni.description,
            collegesCount: uni.colleges.length
          }));
          setUniversities(formattedUniversities);
        } else {
          throw new Error('Invalid data format from server');
        }
      } catch (err) {
        console.error('Error fetching universities:', err);
        setError('Failed to fetch universities. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
}, []);

  const filteredUniversities = universities.filter(university =>
    Object.values(university).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUniversityClick = (university: University) => {
    setSelectedUniversity(university);
    localStorage.setItem('uniId', `${university.id}`);
    setShowColleges(true);
  };

  const handleBackToUniversity = () => {
    setShowColleges(false);
    setSelectedUniversity(null);
  };

  const handleDeleteUniversity = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this university?')) return;

    try {
      const response = await fetch(`${API_URL}/admin/university/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete university');

      setUniversities(universities.filter(u => u.id !== `${id}`));
    } catch (err) {
      console.error('Error deleting university:', err);
      setError('Failed to delete university. Please try again.');
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

      {/* Add/Edit University Modal */}
      <AnimatePresence>
        {(editUniversity || addUniversity) && (
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
              {editUniversity ? (
                <EditUniversity
                  onClose={() => setEditUniversity(null)}
                  id={editUniversity.id}
                  name={editUniversity.name}
                  colleges={editUniversity.colleges}
                  location={editUniversity.location}
                  description={editUniversity.description}
                  // onSuccess={handleUpdateUniversity}
                />
              ) : (
                <AddUniversity 
                  onClose={() => setAddUniversity(false)}
                  // onSuccess={handleAddUniversity}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showColleges && selectedUniversity ? (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <button 
            onClick={handleBackToUniversity}
            className="flex items-center gap-2 mb-6 text-[#00628B] hover:text-[#3d94bd] transition-colors"
          >
            <FaChevronLeft />
            Back to Universities
          </button>
          <Colleges 
            universityName={selectedUniversity.name}
            collegeList={selectedUniversity.colleges}
            universityId={selectedUniversity.id}
            displayed={true} 
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
              University Management
            </motion.h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search universities..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAddUniversity(true)}
                className={`${displayed ? 'flex' : 'hidden'} items-center justify-center gap-2 px-4 py-2 bg-[#00628B] text-white rounded-lg hover:bg-[#3d94bd] transition-colors shadow-sm`}
              >
                <FaPlus /> Add University
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Location', 'Colleges', 'Description', 'Actions'].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUniversities.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      {universities.length === 0 ? 'No universities available' : 'No matching universities found'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredUniversities.map((university) => (
                      <motion.tr
                        key={university.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        {/* <td 
                          className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                          onClick={() => {handleUniversityClick(university)
                          
                          }}
                        >
                          {university.id}
                        </td> */}
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                          onClick={() => handleUniversityClick(university)}
                        >
                          {university.name}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleUniversityClick(university)}
                        >
                          {university.location}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleUniversityClick(university)}
                        >
                          {university.collegesCount || 0}
                        </td>
                        <td 
                          className="px-6 py-4 text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleUniversityClick(university)}
                        >
                          {university.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditUniversity(university);
                              }}
                              title="Edit university"
                            >
                              <FaUserEdit size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUniversity(university.id);
                              }}
                              title="Delete university"
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

export default University;