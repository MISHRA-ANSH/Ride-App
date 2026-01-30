import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import { useDriver } from './DriverContext';

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const { currentUser, login: loginUser, logout: logoutUser } = useUser();
  const { currentDriver, loginDriver, logoutDriver } = useDriver();

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null,
    user: null,
    name: null
  });
  const [authLoading, setAuthLoading] = useState(false);

  // Update auth state when user or driver changes
  useEffect(() => {
    if (currentUser) {
      setAuthState({
        isAuthenticated: true,
        userType: 'user',
        user: currentUser,
        name: currentUser.name
      });
    } else if (currentDriver) {
      setAuthState({
        isAuthenticated: true,
        userType: 'driver',
        user: currentDriver,
        name: currentDriver.name
      });
    } else {
      setAuthState({
        isAuthenticated: false,
        userType: null,
        user: null,
        name: null
      });
    }
  }, [currentUser, currentDriver]);

  // Combined login function
  const login = async (email, password, userType) => {
    setAuthLoading(true);

    try {
      // Small delay to ensure state updates properly
      await new Promise(resolve => setTimeout(resolve, 100));

      if (userType === 'user') {
        const result = loginUser(email, password);
        setAuthLoading(false);
        if (result) {
          return { success: true, userType: 'user' };
        }
        return { success: false, error: 'Invalid email or password' };
      } else if (userType === 'driver') {
        const result = loginDriver(email, password);
        setAuthLoading(false);
        if (result) {
          return { success: true, userType: 'driver' };
        }
        return { success: false, error: 'Invalid email or password' };
      } else if (userType === 'admin') {
        // Mock admin login (for demo)
        if (email === 'admin@ridebook.com' && password === 'admin123') {
          setAuthState({
            isAuthenticated: true,
            userType: 'admin',
            user: { email, name: 'Admin' },
            name: 'Admin'
          });
          setAuthLoading(false);
          return { success: true, userType: 'admin' };
        }
        setAuthLoading(false);
        return { success: false, error: 'Invalid admin credentials' };
      }

      setAuthLoading(false);
      return { success: false, error: 'Invalid user type' };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, error: error.message || 'Login failed' };
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
    setAuthState({
      isAuthenticated: false,
      userType: null,
      user: null,
      name: null
    });
  };

  // Check if user is authenticated
  const checkAuth = () => {
    return currentUser || currentDriver || false;
  };

  const value = {
    // State
    authLoading,

    // Current user/driver
    currentUser,
    currentDriver,

    // Auth state
    authState,

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
