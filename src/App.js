// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Context Providers
import { RideProvider } from './context/RideContext';
import { UserProvider } from './context/UserContext';
import { DriverProvider } from './context/DriverContext';
import { AuthProvider } from './context/AuthContext';

// Import Components
import Header from './components/common/Header';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UserDashboard from './pages/user/UserDashboard';
import BookRidePage from './pages/user/BookRidePage';
import UserRideHistory from './pages/user/UserRideHistory';
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverAvailableRides from './pages/driver/DriverAvailableRides';
import DriverEarnings from './pages/driver/DriverEarnings';

// Import hooks
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedTypes }) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedTypes && !allowedTypes.includes(authState.userType)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <UserProvider>
        <DriverProvider>
          <RideProvider>
            <AuthProvider>
              <div className="App">
                {/* Header with authentication state */}
                <HeaderWithAuth />
                
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* User Routes - Protected */}
                  <Route path="/user/dashboard" element={
                    <ProtectedRoute allowedTypes={['user']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/user/book-ride" element={
                    <ProtectedRoute allowedTypes={['user']}>
                      <BookRidePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/user/ride-history" element={
                    <ProtectedRoute allowedTypes={['user']}>
                      <UserRideHistory />
                    </ProtectedRoute>
                  } />
                  
                  {/* Driver Routes - Protected */}
                  <Route path="/driver/dashboard" element={
                    <ProtectedRoute allowedTypes={['driver']}>
                      <DriverDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/driver/available-rides" element={
                    <ProtectedRoute allowedTypes={['driver']}>
                      <DriverAvailableRides />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/driver/earnings" element={
                    <ProtectedRoute allowedTypes={['driver']}>
                      <DriverEarnings />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes - Will add later */}
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </AuthProvider>
          </RideProvider>
        </DriverProvider>
      </UserProvider>
    </Router>
  );
}

// Header component that uses auth context
const HeaderWithAuth = () => {
  const { authState } = useAuth();
  
  return (
    <Header 
      userType={authState.isAuthenticated ? authState.userType : 'guest'}
      userName={authState.name}
    />
  );
};

export default App;