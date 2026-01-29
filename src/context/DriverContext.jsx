// src/context/DriverContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { MOCK_DRIVERS } from '../data/mockData';

// Create Context
const DriverContext = createContext();

// Initial State
const initialState = {
  currentDriver: null,
  drivers: MOCK_DRIVERS,
  isLoading: false,
  error: null
};

// Reducer Function
const driverReducer = (state, action) => {
  switch (action.type) {
    
    // Login driver
    case 'LOGIN_DRIVER': {
      const { email, password } = action.payload;
      
      // Find driver (mock authentication)
      const driver = state.drivers.find(d => 
        d.email === email && d.password === password
      );
      
      if (!driver) {
        return {
          ...state,
          error: 'Invalid email or password'
        };
      }
      
      // Don't store password in state
      const { password: _, ...driverWithoutPassword } = driver;
      
      return {
        ...state,
        currentDriver: driverWithoutPassword,
        error: null
      };
    }
    
    // Logout driver
    case 'LOGOUT_DRIVER': {
      return {
        ...state,
        currentDriver: null
      };
    }
    
    // Update driver status (available, busy, offline)
    case 'UPDATE_DRIVER_STATUS': {
      const { status } = action.payload;
      
      if (!state.currentDriver) return state;
      
      const updatedDriver = {
        ...state.currentDriver,
        status
      };
      
      const updatedDrivers = state.drivers.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      );
      
      return {
        ...state,
        currentDriver: updatedDriver,
        drivers: updatedDrivers
      };
    }
    
    // Update driver location
    case 'UPDATE_DRIVER_LOCATION': {
      const { location } = action.payload;
      
      if (!state.currentDriver) return state;
      
      const updatedDriver = {
        ...state.currentDriver,
        currentLocation: location
      };
      
      const updatedDrivers = state.drivers.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      );
      
      return {
        ...state,
        currentDriver: updatedDriver,
        drivers: updatedDrivers
      };
    }
    
    // Update driver earnings
    case 'UPDATE_DRIVER_EARNINGS': {
      const { amount } = action.payload;
      
      if (!state.currentDriver) return state;
      
      const updatedDriver = {
        ...state.currentDriver,
        totalEarnings: state.currentDriver.totalEarnings + amount,
        totalRides: state.currentDriver.totalRides + 1
      };
      
      const updatedDrivers = state.drivers.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      );
      
      return {
        ...state,
        currentDriver: updatedDriver,
        drivers: updatedDrivers
      };
    }
    
    // Update driver rating
    case 'UPDATE_DRIVER_RATING': {
      const { newRating } = action.payload;
      
      if (!state.currentDriver) return state;
      
      const currentRating = state.currentDriver.rating || 0;
      const totalRides = state.currentDriver.totalRides;
      
      // Calculate new average rating
      const newAverage = ((currentRating * totalRides) + newRating) / (totalRides + 1);
      
      const updatedDriver = {
        ...state.currentDriver,
        rating: parseFloat(newAverage.toFixed(1))
      };
      
      const updatedDrivers = state.drivers.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      );
      
      return {
        ...state,
        currentDriver: updatedDriver,
        drivers: updatedDrivers
      };
    }
    
    // Register new driver
    case 'REGISTER_DRIVER': {
      const newDriver = {
        id: state.drivers.length + 101, // Start from 101
        ...action.payload,
        status: "offline",
        rating: null,
        totalRides: 0,
        totalEarnings: 0,
        joinedDate: new Date().toISOString(),
        isVerified: false,
        profileImage: null
      };
      
      return {
        ...state,
        drivers: [...state.drivers, newDriver],
        currentDriver: newDriver
      };
    }
    
    // Update driver profile
    case 'UPDATE_DRIVER_PROFILE': {
      const updatedDriver = {
        ...state.currentDriver,
        ...action.payload
      };
      
      const updatedDrivers = state.drivers.map(driver => 
        driver.id === updatedDriver.id ? updatedDriver : driver
      );
      
      return {
        ...state,
        currentDriver: updatedDriver,
        drivers: updatedDrivers
      };
    }
    
    // Set loading state
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    
    // Set error
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    
    // Clear error
    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: null
      };
    }
    
    // Load drivers from localStorage
    case 'LOAD_DRIVERS': {
      return {
        ...state,
        drivers: action.payload || state.drivers
      };
    }
    
    default:
      return state;
  }
};

// Context Provider Component
export const DriverProvider = ({ children }) => {
  const [state, dispatch] = useReducer(driverReducer, initialState);

  // Load drivers from localStorage on mount
  useEffect(() => {
    try {
      const savedDrivers = localStorage.getItem('ridebook_drivers');
      const savedCurrentDriver = localStorage.getItem('ridebook_currentDriver');
      
      if (savedDrivers) {
        dispatch({ type: 'LOAD_DRIVERS', payload: JSON.parse(savedDrivers) });
      }
      
      if (savedCurrentDriver) {
        dispatch({ type: 'LOGIN_DRIVER', payload: JSON.parse(savedCurrentDriver) });
      }
    } catch (error) {
      console.error('Error loading drivers from localStorage:', error);
    }
  }, []);

  // Save drivers to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ridebook_drivers', JSON.stringify(state.drivers));
      if (state.currentDriver) {
        localStorage.setItem('ridebook_currentDriver', JSON.stringify(state.currentDriver));
      } else {
        localStorage.removeItem('ridebook_currentDriver');
      }
    } catch (error) {
      console.error('Error saving drivers to localStorage:', error);
    }
  }, [state.drivers, state.currentDriver]);

  // Action Creators
  const loginDriver = (email, password) => {
    dispatch({ type: 'LOGIN_DRIVER', payload: { email, password } });
  };

  const logoutDriver = () => {
    dispatch({ type: 'LOGOUT_DRIVER' });
  };

  const updateDriverStatus = (status) => {
    dispatch({ type: 'UPDATE_DRIVER_STATUS', payload: { status } });
  };

  const updateDriverLocation = (location) => {
    dispatch({ type: 'UPDATE_DRIVER_LOCATION', payload: { location } });
  };

  const updateDriverEarnings = (amount) => {
    dispatch({ type: 'UPDATE_DRIVER_EARNINGS', payload: { amount } });
  };

  const updateDriverRating = (newRating) => {
    dispatch({ type: 'UPDATE_DRIVER_RATING', payload: { newRating } });
  };

  const registerDriver = (driverData) => {
    dispatch({ type: 'REGISTER_DRIVER', payload: driverData });
  };

  const updateDriverProfile = (profileData) => {
    dispatch({ type: 'UPDATE_DRIVER_PROFILE', payload: profileData });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Get driver by ID
  const getDriverById = (id) => {
    return state.drivers.find(driver => driver.id === id);
  };

  // Get all available drivers
  const getAvailableDrivers = () => {
    return state.drivers.filter(driver => driver.status === "available");
  };

  // Get all busy drivers
  const getBusyDrivers = () => {
    return state.drivers.filter(driver => driver.status === "busy");
  };

  // Get all offline drivers
  const getOfflineDrivers = () => {
    return state.drivers.filter(driver => driver.status === "offline");
  };

  const value = {
    // State
    currentDriver: state.currentDriver,
    drivers: state.drivers,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    loginDriver,
    logoutDriver,
    updateDriverStatus,
    updateDriverLocation,
    updateDriverEarnings,
    updateDriverRating,
    registerDriver,
    updateDriverProfile,
    setLoading,
    setError,
    clearError,
    
    // Getters
    getDriverById,
    getAvailableDrivers,
    getBusyDrivers,
    getOfflineDrivers
  };

  return (
    <DriverContext.Provider value={value}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return context;
};