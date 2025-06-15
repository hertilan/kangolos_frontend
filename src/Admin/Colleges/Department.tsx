import React, { useState } from 'react';
import { FaUserEdit, FaSearch, FaBuilding, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  projects: number
  description?: string;
}

const Department: React.FC<DepartmentProps> = ({ schoolName, departmentsList }) => {
  // Sample department data that matches the departmentsList
  const allDepartments: MyDepartment[] = [
    // School of Engineering
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
    // School of ICT
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
    // School of Business
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
    // School of Medicine
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<MyDepartment | null>(null);

  // Filter departments to only include those in the departmentsList and match the schoolName
  const departments = allDepartments.filter(dept => 
    dept.school === schoolName && departmentsList.includes(dept.name)
  );

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.programs.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDepartmentClick = (dept: MyDepartment) => {
    setSelectedDepartment(dept);
  };

  return (
    <div className="w-full p-6 space-y-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">{schoolName} - Departments</h1>
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
        <div>
          <button className='flex flex-row items-center px-5 py-1 h-fit text-white bg-[#00628B] rounded-md cursor-pointer hover:bg-[#3d94bd] transition-colors duration-500 ease-in-out'>
            Add Department
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Id', 'Name', 'Head', 'Students', 'Faculty', 'Programs','Projects', 'Action'].map((header) => (
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
          {filteredDepartments.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No departments found matching your search
              </td>
            </tr>
          ) : (
            filteredDepartments.map((dept) => (
              <tr
                key={dept._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleDepartmentClick(dept)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.head}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.students.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.faculty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.programs.split(',').length}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dept.projects}</td>
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

    </div>
  );
};

export default Department;