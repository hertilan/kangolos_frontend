import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DeenDashboard from './DeenDashboard'

const Deen :React.FC= () => {
  return (
    <Routes>
      <Route index element={<DeenDashboard/>}/>
    </Routes>
  )
}

export default Deen
