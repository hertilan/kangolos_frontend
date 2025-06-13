import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProjectProgress :React.FC= () => {
          const [students] = useState([
            { id: 1, name: 'Team A', project: 'AI Research', progress: 75, status: 'On Track' },
            { id: 2, name: 'Team B', project: 'Blockchain Dev', progress: 45, status: 'Needs Help' },
            { id: 3, name: 'Team C', project: 'Mobile App', progress: 90, status: 'Ahead' }
          ]);
  return (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Projects Progress</h3>
              <Link to="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium mr-4">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-800">{student.name}</span>
                      <span className="text-sm text-gray-500">{student.status}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          student.progress > 70 ? 'bg-green-500' : 
                          student.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default ProjectProgress
