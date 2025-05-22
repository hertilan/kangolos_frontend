import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLanding from './AdminLanding'

const Admin :React.FC= () => {
  return (
    <Routes>
      <Route index element={<AdminLanding/>}/>
    </Routes>
  )
}

export default Admin
