import React, { createContext, useState, useContext } from 'react';
import { useUser } from './UserContext';
import { useDriver } from './DriverContext';

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const { currentUser, login: loginUser, logout: logoutUser } = useUser();
  const { currentDriver, loginDriver, logoutDriver } = useDriver();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Combined login function
  const login = async (email, password, userType) => {
    setAuthLoading(true);
    
    try {
      if (userType === 'user') {
        loginUser(email, password);
        setIsAuthenticated(true);
        return { success: true, userType: 'user' };
      } else if (userType === 'driver') {
        loginDriver(email, password);
        setIsAuthenticated(true);
        return { success: true, userType: 'driver' };
      } else if (userType === 'admin') {
        // Mock admin login (for demo)
        if (email === 'admin@ridebook.com' && password === 'admin123') {
          setIsAuthenticated(true);
          return { success: true, userType: 'admin' };
        }
        return { success: false, error: 'Invalid admin credentials' };
      }
      
      return { success: false, error: 'Invalid user type' };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Combined logout function
  const logout = () => {
    if (currentUser) {
      logoutUser();
    }
    if (currentDriver) {
      logoutDriver();
    }
    setIsAuthenticated(false);
  };

  // Get current auth state
  const getAuthState = () => {
    if (currentUser) {
      return {
        isAuthenticated: true,
        userType: 'user',
        user: currentUser,
        name: currentUser.name
      };
    } else if (currentDriver) {
      return {
        isAuthenticated: true,
        userType: 'driver',
        user: currentDriver,
        name: currentDriver.name
      };
    } else {
      return {
        isAuthenticated: false,
        userType: null,
        user: null,
        name: null
      };
    }
  };

  // Check if user is authenticated
  const checkAuth = () => {
    return currentUser || currentDriver || false;
  };

  const value = {
    // State
    isAuthenticated,
    authLoading,
    
    // Current user/driver
    currentUser,
    currentDriver,
    
    // Auth state
    authState: getAuthState(),
    
    // Actions
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};