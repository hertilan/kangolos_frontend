import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Department from '../Departments/Department';
import AddSchool from './AddSchool';

interface SchoolProps {
  collegeName: string;
  schoolsList: string[];
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

const School: React.FC<SchoolProps> = ({ collegeName, schoolsList }) => {
  // Sample school data to use if API fetch fails
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
  ];

  const [allSchools, setAllSchools] = useState<MySchool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<MySchool | null>(null);
  const [showDepartments, setShowDepartments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addSchool, setAddSchool] = useState<boolean>(false)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(`https://www.projectmanagement.urcom/admin/schools?college=${encodeURIComponent(collegeName)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          setAllSchools(data);
        } else {
          // Filter sample schools to only include those in the schoolsList
          const filteredSampleSchools = sampleSchools.filter(school => 
            school.college === collegeName && schoolsList.includes(school.name)
          );
          setAllSchools(filteredSampleSchools);
          setError('No data available from server, using sample data');
        }
      } catch (err) {
        console.error('Error fetching schools:', err);
        // Filter sample schools to only include those in the schoolsList
        const filteredSampleSchools = sampleSchools.filter(school => 
          school.college === collegeName && schoolsList.includes(school.name)
        );
        setAllSchools(filteredSampleSchools);
        setError('Failed to fetch data, using sample data');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [collegeName, schoolsList]);

  // Filter schools to only include those in the schoolsList and match the collegeName
  const schools = allSchools.filter(school => 
    school.college === collegeName && schoolsList.includes(school.name)
  );

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.Deen.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.departments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchoolClick = (school: MySchool) => {
    setSelectedSchool(school);
    setShowDepartments(true);
  };

  const handleBackToSchools = () => {
    setShowDepartments(false);
    setSelectedSchool(null);
  };

  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00628B]"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6 bg-white rounded-lg shadow-sm relative">
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}
            {addSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/60 bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <AddSchool 
              onClose={() => setAddSchool(false)} 
              // onSuccess={handleAddCollegeSuccess}
            />
          </div>
        </div>
      )}

      {showDepartments && selectedSchool ? (
        <div>
          <button 
            onClick={handleBackToSchools}
            className="flex items-center gap-2 mb-4 text-[#00628B] hover:text-[#3d94bd]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Schools
          </button>
          <Department 
            schoolName={selectedSchool.name} 
            departmentsList={selectedSchool.departments.split(',')} 
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{collegeName} - Schools</h1>
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search schools..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button onClick={()=>{
                setAddSchool(true)
              }} className='flex flex-row items-center px-5 py-1 h-fit text-white bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out'>
                Add School
              </button>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Id', 'Name', 'Deen', 'Students', 'Projects', 'Departments', 'Action'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">{header}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No schools found matching your search
                  </td>
                </tr>
              ) : (
                filteredSchools.map((school) => (
                  <tr
                    key={school._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleSchoolClick(school)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{school._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{school.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.Deen}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.students.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{school.departments.split(',').length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
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
        </>
      )}
    </div>
  );
};

export default School;