import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const Barchart :React.FC= () => {
    const data = [
  { name: 'Jan', project: 400 },
  { name: 'Feb', project: 300 },
  { name: 'Mar', project: 500 },
  { name: 'Apr', project: 200 },
  { name:  'May', project: 300},
  { name: 'Jun', project: 600},
  { name: 'July', project: 570},
  { name: 'Aug', project: 720},
  { name: 'Sept', project: 444},
  { name: 'Oct', project: 331},
  { name: 'Nov', project: 130},
  { name: 'Dec', project: 760}
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
          <Bar dataKey="project" fill="#60a5fa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Barchart
