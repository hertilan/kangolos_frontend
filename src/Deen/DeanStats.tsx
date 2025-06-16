import React from 'react'
import { FiFileText, FiCheckCircle } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';

const DeanStats :React.FC= () => {
          const schoolStats = {
        departments: 6,
        totalProjects: 286,
        completed: 192,
        inProgress: 84,
        supervisors: 68,
        students: 572
      };
  return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Departments</p>
                      <h3 className="text-xl md:text-2xl font-bold">{schoolStats.departments}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaUniversity size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-xl md:text-2xl font-bold">{schoolStats.totalProjects}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-green-100 text-green-600">
                      <FiFileText size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-purple-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <h3 className="text-xl md:text-2xl font-bold text-purple-600">{schoolStats.completed}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-purple-100 text-purple-600">
                      <FiCheckCircle size={18} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4 md:p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-xl md:text-2xl font-bold">{schoolStats.supervisors}</h3>
                    </div>
                    <div className="p-2 md:p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <FaChalkboardTeacher size={18} />
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default DeanStats
