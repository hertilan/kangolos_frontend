import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NormalUser from './NormalUser'

const Normal :React.FC= () => {
  return (
    <Routes>
        <Route index element={<NormalUser/>}/>
    </Routes>
  )
}

export default Normal
