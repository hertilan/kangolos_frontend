import React from 'react'

const Status :React.FC= () => {
  return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Active Students', value: '12', change: '+2', trend: 'up' },
              { title: 'Projects', value: '8', change: '+1', trend: 'up' },
              { title: 'Pending Reviews', value: '3', change: '-1', trend: 'down' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <div className="flex items-end mt-2">
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                  <span className={`ml-2 text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last week
                  </span>
                </div>
              </div>
            ))}
          </div>
  )
}

export default Status
