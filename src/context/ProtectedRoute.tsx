import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  roles?: string[]; // Array of allowed roles (uppercase)
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  roles = [], 
  redirectPath = '/' 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();


  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Normalize roles to uppercase to match your token format
  const normalizedRoles = roles.map(role => role.toUpperCase());
  
  if (normalizedRoles.length > 0 && (!user || !normalizedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;