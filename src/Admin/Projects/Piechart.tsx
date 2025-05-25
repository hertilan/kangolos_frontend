import React from 'react'
import {
    PieChart,Pie,Tooltip,Cell, ResponsiveContainer,Legend
} from 'recharts'

const Piechart :React.FC= () => {
const data = [
  { name: "Completed", value: 400 },
  { name: "Rejected", value: 300 },
  { name: "Under Development", value: 300 },
  { name: "unsupervised", value: 200 },
];
const COLORS = ["green", "red", "#34d399", "#fbbf24"];
  return (
    <div className="w-full  h-64 bg-white p-4 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">projects analysis</h2>
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

export default Piechart
