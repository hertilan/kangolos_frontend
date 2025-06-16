import React from 'react'
import {  FiFileText,FiBook, FiCheckCircle } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';

const HodStats :React.FC= () => {

          const projectStats = {
    totalProjects: 48,
    approved: 32,
    pendingReview: 12,
    rejected: 4,
    supervisors: 15,
    students: 96
  };
  return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Projects</p>
                      <h3 className="text-2xl font-bold">{projectStats.totalProjects}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FiBook size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Approved Projects</p>
                      <h3 className="text-2xl font-bold text-green-600">{projectStats.approved}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FiCheckCircle size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Review</p>
                      <h3 className="text-2xl font-bold text-yellow-600">{projectStats.pendingReview}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                      <FiFileText size={20} />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Supervisors</p>
                      <h3 className="text-2xl font-bold">{projectStats.supervisors}</h3>
                    </div>
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <FaChalkboardTeacher size={20} />
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default HodStats
