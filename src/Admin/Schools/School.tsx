
import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch, FaPlus, FaChevronLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';
import Department from '../Departments/Department';
import AddSchool from './AddSchool';

interface SchoolProps {
  collegeName: string;
  schoolsList: string[];
  viewAddSchool: boolean;
}

interface MySchool {
  _id: number;
  name: string;
  college: string;
  Deen: string;
  departments: string;
  students: number;
  projects: number;
  description?: string;
}
const School: React.FC<SchoolProps> = ({ collegeName, schoolsList, viewAddSchool }) => {
  const sampleSchools: MySchool[] = [
    {
      _id: 1,
      name: "School of Engineering",
      college: "College of Science and Technology",
      Deen: "Dr. Alice Mukashyaka",
      departments: "Civil Engineering,Electrical Engineering,Mechanical Engineering",
      students: 3200,
      projects: 85,
      description: "Leading engineering school with state-of-the-art facilities"
    },
    
    {
      _id: 2,
      name: "School of ICT",
      college: "College of Science and Technology",
      Deen: "Dr. Patrick Ndayizeye",
      departments: "Computer Science,Information Technology,Cybersecurity",
      students: 2800,
      projects: 120,
      description: "Center of excellence in information and communication technology"
    },
    {
      _id: 3,
      name: "School of Business",
      college: "College of Business and Economics",
      Deen: "Dr. Samuel Gasana",
      departments: "Accounting,Finance,Marketing,Management",
      students: 3500,
      projects: 65,
      description: "Developing business leaders for Rwanda's growing economy"
    },
    {
      _id: 4,
      name: "School of Medicine",
      college: "College of Medicine and Health Sciences",
      Deen: "Dr. Jeanine Uwimana",
      departments: "General Medicine,Surgery,Pediatrics",
      students: 1800,
      projects: 95,
      description: "Training Rwanda's next generation of medical professionals"
    },
    {
      _id: 5,
      name: "School of Education",
      college: "College of Education",
      Deen: "Dr. Grace Uwambajimana",
      departments: "Primary Education,Secondary Education,Special Needs Education",
      students: 4200,
      projects: 40,
      description: "Shaping the future of education in Rwanda"
    }
    // ... other sample schools
  ];

  const [allSchools, setAllSchools] = useState<MySchool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<MySchool | null>(null);
  const [showDepartments, setShowDepartments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addSchool, setAddSchool] = useState(false);
  const [editSchool, setEditSchool] = useState<MySchool | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.projectmanagement.urcom/admin/schools?college=${encodeURIComponent(collegeName)}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const filteredData = data?.filter((school: MySchool) => 
          school.college === collegeName && schoolsList.includes(school.name)
        );
        
        setAllSchools(filteredData?.length ? filteredData : 
          sampleSchools.filter(school => 
            school.college === collegeName && schoolsList.includes(school.name)
          )
        );
        
        if (!filteredData?.length) setError('No data available from server, using sample data');
      } catch (err) {
        console.error('Error fetching schools:', err);
        setAllSchools(sampleSchools.filter(school => 
          school.college === collegeName && schoolsList.includes(school.name)
        ));
        setError('Failed to fetch data, using sample data');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [collegeName, schoolsList]);

  const filteredSchools = allSchools.filter(school =>
    Object.values(school).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const handleSchoolClick = (school: MySchool) => {
    setSelectedSchool(school);
    setShowDepartments(true);
  };

  const handleBackToSchools = () => {
    setShowDepartments(false);
    setSelectedSchool(null);
  };

  const handleAddSchool = (newSchool: MySchool) => {
    setAllSchools([...allSchools, newSchool]);
    setAddSchool(false);
  };

  const handleUpdateSchool = (updatedSchool: MySchool) => {
    setAllSchools(allSchools.map(s => s._id === updatedSchool._id ? updatedSchool : s));
    setEditSchool(null);
  };

  const handleDeleteSchool = (id: number) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      setAllSchools(allSchools.filter(s => s._id !== id));
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

      {/* Add/Edit School Modal */}
      <AnimatePresence>
        {(addSchool || editSchool) && (
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
              <AddSchool 
                onClose={() => editSchool ? setEditSchool(null) : setAddSchool(false)} 
                onSuccess={editSchool ? handleUpdateSchool : handleAddSchool}
                school={editSchool}
                collegeName={collegeName}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDepartments && selectedSchool ? (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <button 
            onClick={handleBackToSchools}
            className="flex items-center gap-2 mb-6 text-[#00628B] hover:text-[#3d94bd] transition-colors"
          >
            <FaChevronLeft />
            Back to Schools
          </button>
          <Department 
            schoolName={selectedSchool.name} 
            departmentsList={selectedSchool.departments.split(',')} 
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
              {collegeName} - Schools
            </motion.h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search schools..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAddSchool(true)}
                className={`${viewAddSchool ? 'flex' : 'hidden'} items-center justify-center gap-2 px-4 py-2 bg-[#00628B] text-white rounded-lg hover:bg-[#3d94bd] transition-colors shadow-sm`}
              >
                <FaPlus /> Add School
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Id', 'Name', 'Deen', 'Students', 'Projects', 'Departments', 'Action'].map((header) => (
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
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      {allSchools.length === 0 ? 'No schools available' : 'No matching schools found'}
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence>
                    {filteredSchools.map((school) => (
                      <motion.tr
                        key={school._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school._id}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school.name}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school.Deen}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school.students.toLocaleString()}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school.projects}
                        </td>
                        <td 
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                          onClick={() => handleSchoolClick(school)}
                        >
                          {school.departments.split(',').length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditSchool(school);
                              }}
                              title="Edit school"
                            >
                              <FaUserEdit size={18} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSchool(school._id);
                              }}
                              title="Delete school"
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

export default School;