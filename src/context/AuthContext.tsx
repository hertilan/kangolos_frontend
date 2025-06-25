// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  exp?: number; // JWT expiration timestamp
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
  loading: boolean;
  validateToken: (token: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validateToken = useCallback((token: string): boolean => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userDataString = localStorage.getItem('user');
    
    if (token && userDataString) {
      try {
        if (!validateToken(token)) {
          throw new Error('Invalid token');
        }
        
        const userData = JSON.parse(userDataString) as UserData;
        setIsAuthenticated(true);
        setUser(userData);
      } catch (e) {
        console.error('Auth validation failed', e);
        logout();
      }
    }
    setLoading(false);
  }, [validateToken, logout]);

  const login = useCallback((token: string, userData: UserData) => {
    if (!validateToken(token)) {
      throw new Error('Invalid token provided');
    }
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    
    const roleRoutes: Record<string, string> = {
      STUDENT: '/student/',
      ADMIN: '/admin/',
      HOD: '/hod/',
      DEAN: '/dean/',
      PRINCIPAL: '/principal/',
      SUPERVISOR: '/supervisor/'
    };

    navigate(roleRoutes[userData.role] || '/dashboard');
  }, [navigate, validateToken]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      loading,
      validateToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};