import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Student from './StudentPages/Student';
import Supervisor from './SupervisorPages/Supervisor';
import Admin from './Admin/Admin';
import Hod from './HOD/Hod';
import Deen from './Deen/Deen';
import Principal from './Principal/Principal';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/student/*' element={<Student />} />
            <Route path='/supervisor/*' element={<Supervisor />} />
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/hod/*' element={<Hod />} />
            <Route path='/deen/*' element={<Deen />} />
            <Route path='/principal/*' element={<Principal />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;