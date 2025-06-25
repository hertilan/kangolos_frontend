import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Cell
} from "recharts";

const Barchart :React.FC= () => {
    const data = [
  { name: 'Nyarugenge', value: 400 },
  { name: 'Gikondo', value: 300 },
  { name: 'Remera', value: 500 },
  { name: 'Nyagatare', value: 200 },
  { name:  'Huye',value: 300},
  { name: 'Musanze', value: 800},

];

  const colors = [
    '#4ade80', // Jan - green
    '#60a5fa', // Feb - blue
    '#f472b6', // Mar - pink
    '#a68bfa', // May - purple
    '#fb923c', // Jun - orange
    '#22d3ee' // July - cyan

  ];
  return (
    <div className="w-full h-64 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">Anually Project Analysis</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
                 <Bar dataKey="value" label={{ position: 'top', fontSize: 12 }}>
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={colors[index % colors.length]}
                      />
                   ))}
                 </Bar>
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Barchart
