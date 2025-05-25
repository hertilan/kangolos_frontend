import React from 'react'
import {
    PieChart,Pie,Tooltip,Cell, ResponsiveContainer,Legend
} from 'recharts'

const Teamspiechart :React.FC= () => {
        const data = [
        { name: 'Nyarugenge', value: 300},
        { name: 'Gikondo', value: 230},
        { name: 'Huye', value: 410},
        { name: 'Musanze', value: 570},
        {name: 'Nyagatare', value: 810},
        { name: 'Remera', value: 180}
    ];
    const COLORS = ["#28a745", "brown", "#dc3545", "green","#6c757d","blue"];
  return (
    <div className="w-full  h-64 p-4 shadow bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Teams analysis</h2>
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

export default Teamspiechart
