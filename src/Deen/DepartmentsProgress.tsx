import React from 'react'

const DepartmentsProgress :React.FC= () => {
          const departments = [
        { name: "Computer Science", projects: 48, completed: 32, color: "bg-blue-100 text-blue-800" },
        { name: "Electrical Engineering", projects: 42, completed: 28, color: "bg-green-100 text-green-800" },
        { name: "Civil Engineering", projects: 38, completed: 25, color: "bg-yellow-100 text-yellow-800" },
        { name: "Mechanical Engineering", projects: 35, completed: 22, color: "bg-red-100 text-red-800" },
        { name: "Biomedical Engineering", projects: 32, completed: 20, color: "bg-purple-100 text-purple-800" },
        { name: "Architecture", projects: 30, completed: 18, color: "bg-indigo-100 text-indigo-800" },
      ];
  return (
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Departments Progress</h3>
                <div className="space-y-4">
                  {departments.map(dept => (
                    <div key={dept.name} className="mb-3">
                      <div className="flex justify-between mb-1 text-sm md:text-base">
                        <span className="font-medium">{dept.name}</span>
                        <span>{dept.completed}/{dept.projects} projects</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${dept.color.split(' ')[0]}`} 
                          style={{ width: `${(dept.completed/dept.projects)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default DepartmentsProgress
