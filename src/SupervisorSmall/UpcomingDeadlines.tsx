import React, { useState } from 'react'

const UpcomingDeadlines :React.FC= () => {

          const [projects] = useState([
            { id: 1, title: 'AI Research', student: 'Student A', deadline: '2023-12-15', status: 'In Progress' },
            { id: 2, title: 'Blockchain Dev', student: 'Student B', deadline: '2023-11-30', status: 'Needs Review' },
            { id: 3, title: 'Mobile App', student: 'Student C', deadline: '2023-12-05', status: 'On Schedule' }
          ]);
  return (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {projects.sort((a,b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3).map((project) => (
                  <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{project.title}</h4>
                        <p className="text-sm text-gray-500">{project.student}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'On Schedule' ? 'bg-green-100 text-green-800' :
                        project.status === 'At Risk' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Due Date</span>
                        <span className="font-medium">{project.deadline}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="h-1 rounded-full bg-indigo-600" 
                          style={{ width: `${Math.random() * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default UpcomingDeadlines
