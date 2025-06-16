

import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch, FaPlus, FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import School from '../Schools/School';
import AddCollege from './AddCollege';

interface College {
  _id: number;
  name: string;
  location: string;
  principal: string;
  students: number;
  projects: number;
  schools: string;
  description?: string;
  established?: string;
}

const Colleges: React.FC = () => {
  const sampleColleges: College[] = [
    {
      _id: 1,
      name: "College of Science and Technology",
      location: "Nyarugenge, Kigali",
      principal: "Dr. Ignace Gatare",
      students: 8500,
      projects: 215,
      schools: "School of Engineering,School of ICT,School of Architecture,School of Sciences",
      description: "Leading institution in science and technology education in Rwanda",
      established: "2013"
    },
    
    {
      _id: 2,
      name: "College of Business and Economics",
      location: "Gikondo, Kigali",
      principal: "Dr. James Gathungu",
      students: 7200,
      projects: 180,
      schools: "School of Business,School of Economics,School of Management",
      description: "Premier business school training Rwanda's future leaders",
      established: "2013"
    },
    {
      _id: 3,
      name: "College of Medicine and Health Sciences",
      location: "Remera, Kigali",
      principal: "Dr. Jeanne Kagwiza",
      students: 6300,
      projects: 320,
      schools: "School of Medicine,School of Nursing,School of Public Health",
      description: "Center of excellence for medical education and research",
      established: "2013"
    },
    {
      _id: 4,
      name: "College of Arts and Social Sciences",
      location: "Huye, Southern Province",
      principal: "Dr. Evariste Ntaganda",
      students: 9100,
      projects: 145,
      schools: "School of Arts,School of Social Sciences,School of Languages,School of Law",
      description: "Promoting humanities and social sciences in Rwanda",
      established: "2013"
    },
    {
      _id: 5,
      name: "College of Agriculture and Veterinary Medicine",
      location: "Busogo, Northern Province",
      principal: "Dr. Laetitia Nyinawamwiza",
      students: 5400,
      projects: 280,
      schools: "School of Agriculture,School of Veterinary Medicine,School of Animal Sciences,School of Food Science,School of Environmental Studies,School of Rural Development",
      description: "Advancing agricultural innovation and food security",
      established: "2013"
    },
    {
      _id: 6,
      name: "College of Education",
      location: "Rukara, Eastern Province",
      principal: "Dr. Philothere Ntawiha",
      students: 6800,
      projects: 95,
      schools: "School of Education,School of Pedagogy,School of Curriculum Studies,School of Early Childhood,School of Special Needs,School of Adult Education",
      description: "Training Rwanda's future educators and teachers",
      established: "2013"
    }
    // ... other sample colleges
  ];

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
        const response = await fetch('https://www.projectmanagement.urcom/admin/colleges');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setColleges(data?.length ? data : sampleColleges);
        if (!data?.length) setError('No data available from server, using sample data');
      } catch (err) {
        console.error('Error fetching colleges:', err);
        setColleges(sampleColleges);
        setError('Failed to fetch data, using sample data');
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(college =>
    Object.values(college).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddCollege = (newCollege: College) => {
    setColleges([...colleges, newCollege]);
    setAddCollege(false);
  };

  const handleUpdateCollege = (updatedCollege: College) => {
    setColleges(colleges.map(c => c._id === updatedCollege._id ? updatedCollege : c));
    setEditCollege(null);
  };

  const handleDeleteCollege = (id: number) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      setColleges(colleges.filter(c => c._id !== id));
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
      {/* Error Alert */}
      {error && (
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded"
        >
          <p>{error}</p>
        </motion.div>
      )}

      {/* Add/Edit College Modal */}
      <AnimatePresence>
        {(addCollege || editCollege) && (
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
              <AddCollege 
                onClose={() => editCollege ? setEditCollege(null) : setAddCollege(false)} 
                onSuccess={editCollege ? handleUpdateCollege : handleAddCollege}
                college={editCollege}
              />
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
            collegeName={selectedCollege.name} 
            schoolsList={selectedCollege.schools.split(',')} 
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
              Colleges Management
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
                  {['Id', 'Name', 'Location', 'Principal', 'Students', 'Projects', 'Schools', 'Action'].map((header) => (
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
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      {colleges.length === 0 ? 'No colleges available' : 'No matching colleges found'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredColleges.map((college) => (
                      <motion.tr
                        key={college._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college._id}
                        </td>
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
                          {college.principal}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.students.toLocaleString()}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.projects}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleCollegeClick(college)}
                        >
                          {college.schools.split(',').length}
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
                                handleDeleteCollege(college._id);
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
