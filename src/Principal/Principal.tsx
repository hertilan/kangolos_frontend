import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrincipalDashboard from './PrincipalDashboard'

const Principal :React.FC= () => {
  return (
    <Routes>
      <Route index element={<PrincipalDashboard/>}/>
    </Routes>
  )
}

export default Principal
