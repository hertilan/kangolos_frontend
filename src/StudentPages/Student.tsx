import React from 'react';
import { Route,Routes } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import Notifications from './Notifications';
import CreateProject from '../StudentSmall/CreateProject';
import ViewProjects from './ViewProjects';
import Team from './Team';

const Student: React.FC = () => {
  return (
    <Routes>
      <Route index element={<StudentDashboard/>}/>
      <Route path='notifications' element={<Notifications/>}/>
      <Route path='create-project' element={<CreateProject/>}/>
      <Route path='/projects' element={< ViewProjects/>}/>
      <Route path='/team' element={<Team/>}/>
    </Routes>
  )
}

export default Student
