// src/pages/user/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCar, 
  FaHistory, 
  FaWallet, 
  FaUser, 
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaPhone,
  FaShieldAlt,
  FaChartLine,
  FaFire,
  FaRocket,
  FaDirections,
  FaRegCreditCard,
  FaBolt,
  FaMapPin
} from 'react-icons/fa';
import './UserDashboard.css';

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'Rahul Sharma',
    walletBalance: 1500,
    totalRides: 12,
    averageRating: 4.8,
    joinedDate: '2023-01-15'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="user-greeting">
              <h1>
                <FaUser className="greeting-icon" />
                Welcome back, {user.name}!
              </h1>
              <p>Here's your ride summary and quick actions</p>
            </div>
            
            <div className="header-actions">
              <button className="btn btn-outline">
                <FaBell /> Notifications
              </button>
              <button className="btn btn-outline">
                <FaCog /> Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Active Ride Section - Mock Data */}
        <div className="active-ride-section">
          <div className="section-header">
            <h2>
              <FaCar /> Active Ride
            </h2>
            <span className="status-badge accepted">ACCEPTED</span>
          </div>
          
          <div className="active-ride-card">
            <div className="ride-info">
              <div className="ride-locations">
                <div className="location-item">
                  <FaMapMarkerAlt className="location-icon pickup" />
                  <div>
                    <p className="location-label">Pickup</p>
                    <p className="location-address">Connaught Place, New Delhi</p>
                    <p className="location-time">
                      <FaClock /> 10:30 AM
                    </p>
                  </div>
                </div>
                
                <div className="route-line"></div>
                
                <div className="location-item">
                  <FaMapMarkerAlt className="location-icon drop" />
                  <div>
                    <p className="location-label">Drop</p>
                    <p className="location-address">Noida Sector 62, Noida</p>
                    <p className="location-eta">
                      <FaBolt /> ETA: 45 min
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ride-details">
                <div className="detail-item">
                  <FaRupeeSign />
                  <span>₹350</span>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <span>45 min</span>
                </div>
                <div className="detail-item">
                  <FaCar />
                  <span>SEDAN</span>
                </div>
                <div className="detail-item">
                  <FaUser />
                  <span>Raj Kumar</span>
                </div>
              </div>
            </div>
            
            <div className="ride-actions">
              <Link to="/user/book-ride" className="btn btn-primary">
                <FaPhone /> Call Driver
              </Link>
              <button className="btn btn-outline">
                <FaShieldAlt /> Share Ride
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/user/book-ride" className="action-card primary">
              <div className="action-icon">
                <FaCar />
              </div>
              <h3>Book a Ride</h3>
              <p>Book a new ride instantly</p>
            </Link>
            
            <Link to="/user/ride-history" className="action-card">
              <div className="action-icon">
                <FaHistory />
              </div>
              <h3>Ride History</h3>
              <p>View all your past rides</p>
            </Link>
            
            <div className="action-card">
              <div className="action-icon">
                <FaWallet />
              </div>
              <h3>Wallet</h3>
              <p>Balance: ₹{user.walletBalance}</p>
              <button className="btn btn-sm btn-outline">
                <FaRegCreditCard /> Add Money
              </button>
            </div>
            
            <div className="action-card">
              <div className="action-icon">
                <FaQuestionCircle />
              </div>
              <h3>Help & Support</h3>
              <p>Get help with your rides</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <h2 className="section-title">Your Ride Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon total-rides">
                  <FaCar />
                </div>
                <h3>Total Rides</h3>
              </div>
              <div className="stat-value">{user.totalRides}</div>
              <p className="stat-subtext">Completed rides</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon total-spent">
                  <FaRupeeSign />
                </div>
                <h3>Total Spent</h3>
              </div>
              <div className="stat-value">₹4,250</div>
              <p className="stat-subtext">On all rides</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon rating">
                  <FaStar />
                </div>
                <h3>Your Rating</h3>
              </div>
              <div className="stat-value">
                {user.averageRating}
                <span className="rating-star">★</span>
              </div>
              <p className="stat-subtext">Average from drivers</p>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon member-since">
                  <FaCalendarAlt />
                </div>
                <h3>Member Since</h3>
              </div>
              <div className="stat-value">
                {formatDate(user.joinedDate)}
              </div>
              <p className="stat-subtext">RideBook user</p>
            </div>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="recent-rides-section">
          <div className="section-header">
            <h2>
              <FaHistory /> Recent Rides
            </h2>
            <Link to="/user/ride-history" className="view-all-link">
              View All →
            </Link>
          </div>
          
          <div className="recent-rides-list">
            <div className="recent-ride-card">
              <div className="ride-summary">
                <div className="ride-date">
                  <FaCalendarAlt />
                  <span>29 Jan, 2024</span>
                  <span className="ride-time">10:30 AM</span>
                </div>
                
                <div className="ride-route">
                  <div className="route-point">
                    <div className="point-marker pickup"></div>
                    <span className="route-address">Connaught Place</span>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point">
                    <div className="point-marker drop"></div>
                    <span className="route-address">Noida Sector 62</span>
                  </div>
                </div>
                
                <div className="ride-meta">
                  <span className="ride-fare">₹350</span>
                  <span className="ride-type">Sedan</span>
                  <span className="status-badge completed">Completed</span>
                </div>
              </div>
              
              <div className="ride-actions">
                <button className="btn btn-sm btn-outline">
                  View Details
                </button>
                <button className="btn btn-sm btn-primary">
                  Rate Ride
                </button>
              </div>
            </div>
            
            <div className="recent-ride-card">
              <div className="ride-summary">
                <div className="ride-date">
                  <FaCalendarAlt />
                  <span>28 Jan, 2024</span>
                  <span className="ride-time">06:45 PM</span>
                </div>
                
                <div className="ride-route">
                  <div className="route-point">
                    <div className="point-marker pickup"></div>
                    <span className="route-address">Hauz Khas</span>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point">
                    <div className="point-marker drop"></div>
                    <span className="route-address">Gurugram</span>
                  </div>
                </div>
                
                <div className="ride-meta">
                  <span className="ride-fare">₹310</span>
                  <span className="ride-type">Sedan</span>
                  <span className="status-badge paid">Paid</span>
                </div>
              </div>
              
              <div className="ride-actions">
                <button className="btn btn-sm btn-outline">
                  View Details
                </button>
                <button className="btn btn-sm btn-outline">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offers Section */}
        <div className="offers-section">
          <h2 className="section-title">
            <FaFire /> Special Offers
          </h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">HOT</div>
              <div className="offer-content">
                <h3>Weekend Special</h3>
                <p>50% off on your next 3 rides</p>
                <div className="offer-code">WEEKEND50</div>
              </div>
            </div>
            
            <div className="offer-card">
              <div className="offer-badge">NEW</div>
              <div className="offer-content">
                <h3>Refer & Earn</h3>
                <p>Get ₹200 on every friend referral</p>
                <div className="offer-code">REFER200</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;