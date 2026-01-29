// src/components/common/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTaxi,
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaCar,
  FaHistory,
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import './Header.css';

const Header = ({ userType = 'guest', userName = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <Link to="/" className="logo-link">
              <FaTaxi className="logo-icon" /> 
              <span>RideBook</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            {userType === 'guest' && (
              <>
                <Link to="/" className="nav-link">
                  <FaHome /> Home
                </Link>
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  <FaUserPlus /> Sign Up
                </Link>
              </>
            )}

            {userType === 'user' && (
              <>
                <Link to="/user/dashboard" className="nav-link">
                  <FaTachometerAlt /> Dashboard
                </Link>
                <Link to="/user/book-ride" className="nav-link">
                  <FaCar /> Book Ride
                </Link>
                <Link to="/user/ride-history" className="nav-link">
                  <FaHistory /> History
                </Link>
                <span className="user-welcome">
                  <FaUser /> {userName}
                </span>
                <button onClick={handleLogout} className="btn btn-outline">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}

            {userType === 'driver' && (
              <>
                <Link to="/driver/dashboard" className="nav-link">
                  <FaTachometerAlt /> Dashboard
                </Link>
                <Link to="/driver/available-rides" className="nav-link">
                  <FaCar /> Available Rides
                </Link>
                <Link to="/driver/earnings" className="nav-link">
                  <FaMoneyCheckAlt /> Earnings
                </Link>
                <span className="user-welcome">
                  <FaTaxi /> {userName}
                </span>
                <button onClick={handleLogout} className="btn btn-outline">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;