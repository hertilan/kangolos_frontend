import React from 'react';
import { Route,Routes } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import Notifications from './Notifications';
import CreateProject from '../StudentSmall/CreateProject';

const Student: React.FC = () => {
  return (
    <Routes>
      <Route index element={<StudentDashboard/>}/>
      <Route path='notifications' element={<Notifications/>}/>
      <Route path='create-project' element={<CreateProject/>}/>
    </Routes>
  )
}

export default Student
