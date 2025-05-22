import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Student from './StudentPages/Student';
import Supervisor from './SupervisorPages/Supervisor';
import Admin from './Admin/Admin';

const App: React.FC = () => {
  return (
    <Router>
     <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path = '/signup' element = {<Signup/>}/>
      <Route path='/student/*' element = {<Student/>}/>
      <Route path='/supervisor/*' element={<Supervisor/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
    </Routes> 
    </Router>
  )
}

export default App
