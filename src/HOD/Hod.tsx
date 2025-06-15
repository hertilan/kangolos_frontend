import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HODDashboard from './HodDashboard'

const Hod :React.FC= () => {
  return (
    <Routes>
      <Route index element={<HODDashboard/>}/>
    </Routes>
  )
}

export default Hod
