import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';

const UserContext = createContext();

const initialState = {
  currentUser: null,
  users: MOCK_USERS,
  isLoading: false,
  error: null
};

const userReducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN': {
      const { email, password } = action.payload;

      const user = state.users.find(u =>
        u.email === email && u.password === password
      );

      if (!user) {
        return {
          ...state,
          error: 'Invalid email or password'
        };
      }

      const { password: _, ...userWithoutPassword } = user;

      return {
        ...state,
        currentUser: userWithoutPassword,
        error: null
      };
    }

    // Logout user
    case 'LOGOUT': {
      return {
        ...state,
        currentUser: null
      };
    }

    // Register new user
    case 'REGISTER': {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
        walletBalance: 0,
        joinedDate: new Date().toISOString(),
        totalRides: 0,
        averageRating: null,
        profileImage: null
      };

      return {
        ...state,
        users: [...state.users, newUser],
        currentUser: newUser
      };
    }

    // Update user profile
    case 'UPDATE_PROFILE': {
      const updatedUser = {
        ...state.currentUser,
        ...action.payload
      };

      const updatedUsers = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsers
      };
    }

    // Update wallet balance
    case 'UPDATE_WALLET': {
      const { amount, type } = action.payload; // type: 'add' or 'deduct'

      if (!state.currentUser) return state;

      const newBalance = type === 'add'
        ? state.currentUser.walletBalance + amount
        : state.currentUser.walletBalance - amount;

      const updatedUser = {
        ...state.currentUser,
        walletBalance: newBalance
      };

      const updatedUsers = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsers
      };
    }

    // Add ride to user's history
    case 'ADD_USER_RIDE': {
      if (!state.currentUser) return state;

      const updatedUser = {
        ...state.currentUser,
        totalRides: state.currentUser.totalRides + 1
      };

      const updatedUsers = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsers
      };
    }

    // Update user rating
    case 'UPDATE_USER_RATING': {
      const { newRating } = action.payload;

      if (!state.currentUser) return state;

      const currentRating = state.currentUser.averageRating || 0;
      const totalRides = state.currentUser.totalRides;

      // Calculate new average rating
      const newAverage = ((currentRating * totalRides) + newRating) / (totalRides + 1);

      const updatedUser = {
        ...state.currentUser,
        averageRating: parseFloat(newAverage.toFixed(1))
      };

      const updatedUsers = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );

      return {
        ...state,
        currentUser: updatedUser,
        users: updatedUsers
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

    // Load users from localStorage
    case 'LOAD_USERS': {
      return {
        ...state,
        users: action.payload || state.users
      };
    }

    default:
      return state;
  }
};

// Context Provider Component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load users from localStorage on mount
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('ridebook_users');
      const savedCurrentUser = localStorage.getItem('ridebook_currentUser');

      if (savedUsers) {
        dispatch({ type: 'LOAD_USERS', payload: JSON.parse(savedUsers) });
      }

      if (savedCurrentUser) {
        // In real app, you would verify token/session here
        dispatch({ type: 'LOGIN', payload: JSON.parse(savedCurrentUser) });
      }
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ridebook_users', JSON.stringify(state.users));
      if (state.currentUser) {
        localStorage.setItem('ridebook_currentUser', JSON.stringify(state.currentUser));
      } else {
        localStorage.removeItem('ridebook_currentUser');
      }
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, [state.users, state.currentUser]);

  // Action Creators
  const login = (email, password) => {
    // Find user (mock authentication)
    const user = state.users.find(u =>
      u.email === email && u.password === password
    );

    if (!user) {
      return false; // Login failed
    }

    // Login successful - update state
    dispatch({ type: 'LOGIN', payload: { email, password } });
    return true; // Login successful
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const register = (userData) => {
    dispatch({ type: 'REGISTER', payload: userData });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const updateWallet = (amount, type) => {
    dispatch({ type: 'UPDATE_WALLET', payload: { amount, type } });
  };

  const addUserRide = () => {
    dispatch({ type: 'ADD_USER_RIDE' });
  };

  const updateUserRating = (newRating) => {
    dispatch({ type: 'UPDATE_USER_RATING', payload: { newRating } });
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

  // Get user by ID
  const getUserById = (id) => {
    return state.users.find(user => user.id === id);
  };

  // Get all users
  const getAllUsers = () => {
    return state.users;
  };

  const value = {
    // State
    currentUser: state.currentUser,
    users: state.users,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login,
    logout,
    register,
    updateProfile,
    updateWallet,
    addUserRide,
    updateUserRating,
    setLoading,
    setError,
    clearError,

    // Getters
    getUserById,
    getAllUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};