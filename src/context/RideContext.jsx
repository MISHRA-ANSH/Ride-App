// src/context/RideContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { 
  INITIAL_RIDES, 
  RIDE_STATUS,
  generateRideId 
} from '../data/mockData';

// Create Context
const RideContext = createContext();

// Initial State
const initialState = {
  rides: INITIAL_RIDES,
  activeUserRide: null,
  activeDriverRide: null,
  isLoading: false,
  error: null
};

// Reducer Function
const rideReducer = (state, action) => {
  switch (action.type) {
    
    // Request a new ride
    case 'REQUEST_RIDE': {
      const newRide = {
        id: generateRideId(),
        ...action.payload,
        status: RIDE_STATUS.REQUESTED,
        requestedAt: new Date().toISOString(),
        acceptedAt: null,
        startedAt: null,
        completedAt: null,
        paidAt: null,
        paymentMethod: null,
        cancellationReason: null,
        cancelledBy: null,
        userRating: null,
        driverRating: null,
        userReview: null,
        driverReview: null
      };
      
      return {
        ...state,
        rides: [...state.rides, newRide],
        activeUserRide: newRide
      };
    }
    
    // Driver accepts a ride
    case 'ACCEPT_RIDE': {
      const { rideId, driverId } = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId && ride.status === RIDE_STATUS.REQUESTED) {
          return {
            ...ride,
            status: RIDE_STATUS.ACCEPTED,
            driverId,
            acceptedAt: new Date().toISOString()
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides,
        activeDriverRide: updatedRides.find(r => r.id === rideId)
      };
    }
    
    // Start the ride
    case 'START_RIDE': {
      const rideId = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId && ride.status === RIDE_STATUS.ACCEPTED) {
          return {
            ...ride,
            status: RIDE_STATUS.STARTED,
            startedAt: new Date().toISOString()
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides
      };
    }
    
    // Complete the ride
    case 'COMPLETE_RIDE': {
      const rideId = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId && ride.status === RIDE_STATUS.STARTED) {
          return {
            ...ride,
            status: RIDE_STATUS.COMPLETED,
            completedAt: new Date().toISOString()
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides
      };
    }
    
    // Mark ride as paid
    case 'MARK_AS_PAID': {
      const { rideId, paymentMethod } = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId && ride.status === RIDE_STATUS.COMPLETED) {
          return {
            ...ride,
            status: RIDE_STATUS.PAID,
            paymentMethod,
            paidAt: new Date().toISOString()
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides,
        activeUserRide: null,
        activeDriverRide: null
      };
    }
    
    // Cancel a ride
    case 'CANCEL_RIDE': {
      const { rideId, reason, cancelledBy } = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId && 
            (ride.status === RIDE_STATUS.REQUESTED || 
             ride.status === RIDE_STATUS.ACCEPTED)) {
          return {
            ...ride,
            status: RIDE_STATUS.CANCELLED,
            cancellationReason: reason,
            cancelledBy
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides,
        activeUserRide: null,
        activeDriverRide: cancelledBy === 'driver' ? null : state.activeDriverRide
      };
    }
    
    // Rate a ride
    case 'RATE_RIDE': {
      const { rideId, rating, review, ratedBy } = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId) {
          if (ratedBy === 'user') {
            return {
              ...ride,
              userRating: rating,
              userReview: review
            };
          } else if (ratedBy === 'driver') {
            return {
              ...ride,
              driverRating: rating,
              driverReview: review
            };
          }
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides
      };
    }
    
    // Update ride location (for tracking)
    case 'UPDATE_RIDE_LOCATION': {
      const { rideId, currentLocation } = action.payload;
      
      const updatedRides = state.rides.map(ride => {
        if (ride.id === rideId) {
          return {
            ...ride,
            currentLocation // This would be used for live tracking
          };
        }
        return ride;
      });
      
      return {
        ...state,
        rides: updatedRides
      };
    }
    
    // Set active rides
    case 'SET_ACTIVE_RIDES': {
      const { userId, driverId } = action.payload;
      
      const activeUserRide = state.rides.find(ride => 
        ride.userId === userId && 
        ["requested", "accepted", "started"].includes(ride.status)
      );
      
      const activeDriverRide = state.rides.find(ride => 
        ride.driverId === driverId && 
        ["accepted", "started"].includes(ride.status)
      );
      
      return {
        ...state,
        activeUserRide,
        activeDriverRide
      };
    }
    
    // Clear active ride
    case 'CLEAR_ACTIVE_RIDE': {
      const { userType } = action.payload;
      
      if (userType === 'user') {
        return {
          ...state,
          activeUserRide: null
        };
      } else if (userType === 'driver') {
        return {
          ...state,
          activeDriverRide: null
        };
      }
      return state;
    }
    
    // Load rides from localStorage
    case 'LOAD_RIDES': {
      return {
        ...state,
        rides: action.payload || state.rides
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
    
    default:
      return state;
  }
};

// Context Provider Component
export const RideProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rideReducer, initialState);

  // Load rides from localStorage on mount
  useEffect(() => {
    try {
      const savedRides = localStorage.getItem('ridebook_rides');
      if (savedRides) {
        dispatch({ type: 'LOAD_RIDES', payload: JSON.parse(savedRides) });
      }
    } catch (error) {
      console.error('Error loading rides from localStorage:', error);
    }
  }, []);

  // Save rides to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ridebook_rides', JSON.stringify(state.rides));
    } catch (error) {
      console.error('Error saving rides to localStorage:', error);
    }
  }, [state.rides]);

  // Action Creators
  const requestRide = (rideData) => {
    dispatch({ type: 'REQUEST_RIDE', payload: rideData });
  };

  const acceptRide = (rideId, driverId) => {
    dispatch({ type: 'ACCEPT_RIDE', payload: { rideId, driverId } });
  };

  const startRide = (rideId) => {
    dispatch({ type: 'START_RIDE', payload: rideId });
  };

  const completeRide = (rideId) => {
    dispatch({ type: 'COMPLETE_RIDE', payload: rideId });
  };

  const markAsPaid = (rideId, paymentMethod) => {
    dispatch({ type: 'MARK_AS_PAID', payload: { rideId, paymentMethod } });
  };

  const cancelRide = (rideId, reason, cancelledBy) => {
    dispatch({ type: 'CANCEL_RIDE', payload: { rideId, reason, cancelledBy } });
  };

  const rateRide = (rideId, rating, review, ratedBy) => {
    dispatch({ type: 'RATE_RIDE', payload: { rideId, rating, review, ratedBy } });
  };

  const updateRideLocation = (rideId, currentLocation) => {
    dispatch({ type: 'UPDATE_RIDE_LOCATION', payload: { rideId, currentLocation } });
  };

  const setActiveRides = (userId, driverId) => {
    dispatch({ type: 'SET_ACTIVE_RIDES', payload: { userId, driverId } });
  };

  const clearActiveRide = (userType) => {
    dispatch({ type: 'CLEAR_ACTIVE_RIDE', payload: { userType } });
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

  const getAvailableRides = () => {
    return state.rides.filter(ride => ride.status === RIDE_STATUS.REQUESTED);
  };

  const getUserRideHistory = (userId) => {
    return state.rides.filter(ride => ride.userId === userId);
  };

  
  const getDriverRideHistory = (driverId) => {
    return state.rides.filter(ride => ride.driverId === driverId);
  };

  const getRideById = (rideId) => {
    return state.rides.find(ride => ride.id === rideId);
  };

  const value = {
    rides: state.rides,
    activeUserRide: state.activeUserRide,
    activeDriverRide: state.activeDriverRide,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    requestRide,
    acceptRide,
    startRide,
    completeRide,
    markAsPaid,
    cancelRide,
    rateRide,
    updateRideLocation,
    setActiveRides,
    clearActiveRide,
    setLoading,
    setError,
    clearError,
    
    // Getters
    getAvailableRides,
    getUserRideHistory,
    getDriverRideHistory,
    getRideById
  };

  return (
    <RideContext.Provider value={value}>
      {children}
    </RideContext.Provider>
  );
};

// Custom hook to use ride context
export const useRides = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRides must be used within a RideProvider');
  }
  return context;
};