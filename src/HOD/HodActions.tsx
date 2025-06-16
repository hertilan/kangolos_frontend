import React from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa';
import {  FiFileText, FiCheckCircle } from 'react-icons/fi';
import { BsCalendarCheck } from 'react-icons/bs';

const HodActions :React.FC= () => {
  return (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                      <FiCheckCircle size={18} />
                    </div>
                    <span className="text-sm font-medium">Approve Project</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                      <FaChalkboardTeacher size={18} />
                    </div>
                    <span className="text-sm font-medium">Assign Supervisor</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                      <BsCalendarCheck size={18} />
                    </div>
                    <span className="text-sm font-medium">Schedule Defense</span>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors">
                    <div className="mx-auto w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                      <FiFileText size={18} />
                    </div>
                    <span className="text-sm font-medium">Generate Report</span>
                  </button>
                </div>
              </div>
  )
}

export default HodActions
