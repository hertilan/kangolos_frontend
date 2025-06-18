import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  loadingComponent?: React.ReactNode;
  roles?: string[]; // Optional role-based access control
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  loadingComponent = <div>Loading...</div>,
  roles 
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return loadingComponent;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Optional: Role-based access control
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;