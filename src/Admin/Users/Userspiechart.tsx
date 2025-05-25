import React from 'react'
import {
    PieChart,Pie,Tooltip,Cell, ResponsiveContainer,Legend
} from 'recharts'

const Userspiechart :React.FC= () => {
    const data = [
        { name: 'Active', value: 100},
        { name: 'with no teams', value: 30},
        { name: 'Inactive', value: 10},
        { name: 'with teams', value: 70},
        {name: 'All', value: 110}
    ];
    const COLORS = ["#28a745", "#ffc107", "#dc3545", "#17a2b8","#6c757d"];
  return (
    <div className="w-full  h-64 p-4 shadow bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Users analysis</h2>
      <ResponsiveContainer width="100%" height="100%" className='w-full h-fit'>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Userspiechart
