import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Status from './Status';



    const SupervisorDashboard: React.FC = () => {
      const [notifications] = useState([
        { id: 1, text: 'New submission from Student A', time: '10 min ago', read: false },
        { id: 2, text: 'Project B needs approval', time: '2 hours ago', read: true }
      ]);
    
      // Sample data - replace with real data
      const [students] = useState([
        { id: 1, name: 'Student A', project: 'AI Research', progress: 75, status: 'On Track' },
        { id: 2, name: 'Student B', project: 'Blockchain Dev', progress: 45, status: 'Needs Help' },
        { id: 3, name: 'Student C', project: 'Mobile App', progress: 90, status: 'Ahead' }
      ]);

      const [projects] = useState([
        { id: 1, title: 'AI Research', student: 'Student A', deadline: '2023-12-15', status: 'In Progress' },
        { id: 2, title: 'Blockchain Dev', student: 'Student B', deadline: '2023-11-30', status: 'Needs Review' },
        { id: 3, title: 'Mobile App', student: 'Student C', deadline: '2023-12-05', status: 'On Schedule' }
      ]);
  return (
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

          {/* Stats Cards */}
          <Status/>

          {/* Students Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Student Progress</h3>
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

          {/* Projects Needing Attention */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
        </main>
  )
}

export default SupervisorDashboard
