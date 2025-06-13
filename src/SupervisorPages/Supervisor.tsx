import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SupervisorLanding from './SupervisorsLanding'

const Supervisor :React.FC= () => {
  return (
    <Routes>
      <Route index element={<SupervisorLanding/>}/>
    </Routes>
  )
}

export default Supervisor
