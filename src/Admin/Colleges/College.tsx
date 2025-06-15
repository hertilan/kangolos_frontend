import React, { useState } from 'react';
import { FaUserEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import School from './School';

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
  const [colleges, setColleges] = useState<College[]>([
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
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showSchools, setShowSchools] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.principal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCollegeClick = (college: College) => {
    setSelectedCollege(college);
    setShowSchools(true);
  };

  const handleBackToColleges = () => {
    setShowSchools(false);
    setSelectedCollege(null);
  };

  return (
    <div className="w-full py-6 space-y-6 bg-white rounded-lg shadow-sm">
      {showSchools && selectedCollege ? (
        <div>
          <button 
            onClick={handleBackToColleges}
            className="flex items-center gap-2 mb-4 text-[#00628B] hover:text-[#3d94bd]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Colleges
          </button>
          <School collegeName={selectedCollege.name} schoolsList={selectedCollege.schools.split(',')} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Colleges Management</h1>
            <div className="relative w-full md:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button className='flex flex-row items-center px-5 py-1 h-fit text-white bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out'>
                Add College
              </button>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Id', 'Name', 'Location', 'Principal', 'Students', 'Projects', 'Schools', 'Action'].map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center">{header}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredColleges.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No colleges found matching your search
                  </td>
                </tr>
              ) : (
                filteredColleges.map((college) => (
                  <tr
                    key={college._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCollegeClick(college)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{college._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{college.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{college.principal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.students.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.projects}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{college.schools.split(',').length}</td>
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

export default Colleges;