import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import Home from './Components/Home';
import Student from './StudentPages/Student';
import Supervisor from './SupervisorPages/Supervisor';
import Admin from './Admin/Admin';
import Hod from './HOD/Hod';
import Principal from './Principal/Principal';
// import Unauthorized from './context/Authorizes';
import Deen from './Deen/Deen';
import Normal from './NormalUser/Normal';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/student/*" element={<Student />} />
        <Route path="/supervisor/*" element={<Supervisor />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/hod/*" element={<Hod />} />
        <Route path="/dean/*" element={<Deen />} />
        <Route path="/principal/*" element={<Principal />} />
      </Routes> */}
      <AuthProvider>
        <Routes> 
          {/* Public routes */}
          <Route path="/" element={<Home />} />        
           {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/unauthorized" element={<Unauthorized />} /> */}

          {/* Student routes */}
          <Route element={<ProtectedRoute roles={['STUDENT']} />}>
            <Route path="/student/*" element={<Student />} />
          </Route>

          <Route element={<ProtectedRoute roles = {['USER']}/>}>
          <Route path='/user/*' element={<Normal/>}/>
          </Route>


          {/* Supervisor routes */}
          <Route element={<ProtectedRoute roles={['SUPERVISOR']} />}>
            <Route path="/supervisor/*" element={<Supervisor />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={['ADMIN']} />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>

          {/* HOD routes */}
          <Route element={<ProtectedRoute roles={['HOD']} />}>
            <Route path="/hod/*" element={<Hod />} />
          </Route>

          {/* Dean routes - Fixed path to match component */}
          <Route element={<ProtectedRoute roles={['DEAN']} />}>
            <Route path="/dean/*" element={<Deen />} />
          </Route>

          {/* Principal routes */}
          <Route element={<ProtectedRoute roles={['PRINCIPAL']} />}>
            <Route path="/principal/*" element={<Principal />} />
          </Route>

          {/* Common protected routes example */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;