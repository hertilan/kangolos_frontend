import React, { useState } from 'react'

const PendingApprovals :React.FC= () => {

          const [projects] = useState([
        { id: 1, title: 'AI Research', student: 'Student A', deadline: '2023-12-15', status: 'In Progress' },
        { id: 2, title: 'Blockchain Dev', student: 'Student B', deadline: '2023-11-30', status: 'Needs Review' },
        { id: 3, title: 'Mobile App', student: 'Student C', deadline: '2023-12-05', status: 'On Schedule' }
      ]);
  return (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Pending Approvals</h3>
              <div className="space-y-4">
                {projects.filter(p => p.status === 'Needs Review').map((project) => (
                  <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{project.title}</h4>
                        <p className="text-sm text-gray-500">{project.student}</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Needs Review
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">Due: {project.deadline}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Review Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default PendingApprovals
