import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddDepartment from './AddDepartment';

interface DepartmentProps {
  schoolName: string;
  departmentsList: string[];
}

interface MyDepartment {
  _id: number;
  name: string;
  school: string;
  head: string;
  programs: string;
  students: number;
  faculty: number;
  projects: number;
  description?: string;
}

const Department: React.FC<DepartmentProps> = ({ schoolName, departmentsList }) => {
  // Sample department data to use if API fetch fails
  const sampleDepartments: MyDepartment[] = [
    {
      _id: 1,
      name: "Civil Engineering",
      school: "School of Engineering",
      head: "Dr. John Mugisha",
      programs: "BSc Civil Engineering, MSc Structural Engineering",
      students: 850,
      faculty: 25,
      projects: 37,
      description: "Training the next generation of civil engineers"
    },
    { 
      _id: 2,
      name: "Electrical Engineering",
      school: "School of Engineering",
      head: "Dr. Marie Uwase",
      programs: "BSc Electrical Engineering, MSc Power Systems",
      students: 920,
      faculty: 28,
      projects: 37,
      description: "Advancing electrical engineering education and research"
    },
    {
      _id: 3,
      name: "Computer Science",
      school: "School of ICT",
      head: "Dr. Patrick Nkurunziza",
      programs: "BSc Computer Science, MSc Data Science",
      students: 1100,
      faculty: 32,
      projects: 37,
      description: "Leading computer science education in the region"
    },
    {
      _id: 4,
      name: "Accounting",
      school: "School of Business",
      head: "Dr. Alice Nyirahabimana",
      programs: "BBA Accounting, MBA Finance",
      students: 950,
      faculty: 22,
      projects: 37,
      description: "Developing accounting professionals for Rwanda's economy"
    },
    {
      _id: 5,
      name: "General Medicine",
      school: "School of Medicine",
      head: "Dr. Eric Mutabazi",
      programs: "MD Medicine, MSc Public Health",
      students: 650,
      faculty: 45,
      projects: 37,
      description: "Training medical doctors for Rwanda's healthcare system"
    }
  ];

  const [departments, setDepartments] = useState<MyDepartment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<MyDepartment | null>(null);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`https://www.projectmanagement.urcom/admin/departments?school=${encodeURIComponent(schoolName)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const filteredData = data.filter((dept: MyDepartment) => 
            departmentsList.includes(dept.name)
          );
          setDepartments(filteredData);
        } else {
          const filteredSample = sampleDepartments.filter(dept => 
            dept.school === schoolName && departmentsList.includes(dept.name)
          );
          setDepartments(filteredSample);
          setError('No data available from server, using sample data');
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
        const filteredSample = sampleDepartments.filter(dept => 
          dept.school === schoolName && departmentsList.includes(dept.name)
        );
        setDepartments(filteredSample);
        setError('Failed to fetch data, using sample data');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [schoolName, departmentsList]);

  const handleAddDepartmentSuccess = (newDepartment: MyDepartment) => {
    setDepartments([...departments, newDepartment]);
    setShowAddDepartment(false);
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.programs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDepartmentClick = (dept: MyDepartment) => {
    setSelectedDepartment(dept);
  };

  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00628B]"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6 bg-white rounded-lg shadow-sm">
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Add Department Modal */}
      {showAddDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <AddDepartment 
              schoolName={schoolName}
              onClose={() => setShowAddDepartment(false)}
              onSuccess={handleAddDepartmentSuccess}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{schoolName} - Departments</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAddDepartment(true)}
            className='flex flex-row items-center justify-center px-4 py-2 h-fit text-white bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out'
          >
            Add Department
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Id', 'Name', 'Head', 'Students', 'Faculty', 'Programs', 'Projects', 'Action'].map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  <div className="flex items-center">{header}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDepartments.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  {loading ? 'Loading...' : 'No departments found matching your search'}
                </td>
              </tr>
            ) : (
              filteredDepartments.map((dept) => (
                <tr
                  key={dept._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleDepartmentClick(dept)}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{dept._id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dept.head}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dept.students.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dept.faculty}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dept.programs.split(',').length}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{dept.projects}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit functionality here
                      }}
                    >
                      <FaUserEdit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Delete functionality here
                      }}
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

      {/* Department Details Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDepartment.name}</h2>
                <button 
                  onClick={() => setSelectedDepartment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">School</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.school}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department Head</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.head}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Students</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.students.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Faculty Members</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.faculty}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.projects}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500">Programs Offered</h3>
                <div className="mt-2 space-y-1">
                  {selectedDepartment.programs.split(',').map((program, index) => (
                    <p key={index} className="text-sm text-gray-900">• {program.trim()}</p>
                  ))}
                </div>
              </div>

              {selectedDepartment.description && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedDepartment.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;