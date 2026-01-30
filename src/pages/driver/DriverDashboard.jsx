import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCar,
  FaWallet,
  FaUser,
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
  FaBell,
  FaCog,
  FaChartLine,
  FaPhone,
  FaUsers,
  FaShieldAlt,
  FaBolt,
  FaTachometerAlt,
  FaRoad,
  FaGasPump,
  FaTools,
  FaCreditCard,
  FaHistory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMotorcycle,
  FaTaxi,
  FaTruck
} from 'react-icons/fa';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [driver, setDriver] = useState({
    name: 'Raj Kumar',
    rating: 4.8,
    totalRides: 245,
    totalEarnings: 125000,
    todayEarnings: 1850,
    todayRides: 8,
    vehicle: {
      type: 'Sedan',
      model: 'Hyundai i10',
      color: 'White',
      plateNumber: 'DL 04 AB 1234',
      year: 2020
    },
    status: 'available', // available, busy, offline
    currentLocation: 'Dwarka, Delhi',
    nextPayment: 12500,
    weeklyGoal: 15000,
    weeklyProgress: 85
  });

  const [activeRide, setActiveRide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock active ride data
      setActiveRide({
        id: 'RIDE001',
        pickup: 'Connaught Place, New Delhi',
        drop: 'Noida Sector 62, Noida',
        fare: 350,
        passengerName: 'Rahul Sharma',
        passengerPhone: '9876543210',
        estimatedDuration: '45 min',
        pickupTime: '10:30 AM',
        status: 'accepted'
      });
    }, 1000);
  }, []);

  const toggleOnlineStatus = () => {
    setOnlineStatus(!onlineStatus);
    setDriver(prev => ({
      ...prev,
      status: !onlineStatus ? 'available' : 'offline'
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getVehicleIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'bike': return <FaMotorcycle />;
      case 'auto': return <FaTaxi />;
      case 'sedan': return <FaCar />;
      case 'suv': return <FaTruck />;
      default: return <FaCar />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'offline': return '#64748b';
      default: return '#64748b';
    }
  };

  if (isLoading) {
    return (
      <div className="driver-loading">
        <div className="loading-spinner"></div>
        <p>Loading driver dashboard...</p>
      </div>
    );
  }

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <div className="driver-header">
        <div className="container">
          <div className="header-content">
            <div className="driver-info-section">
              <div className="driver-avatar">
                {driver.name.charAt(0)}
                <div 
                  className="status-indicator" 
                  style={{ backgroundColor: getStatusColor(driver.status) }}
                ></div>
              </div>
              <div className="driver-details">
                <h1>
                  <FaUser /> Welcome, {driver.name}!
                </h1>
                <div className="driver-meta">
                  <span className="driver-rating">
                    <FaStar /> {driver.rating} • {driver.totalRides} rides
                  </span>
                  <span className="driver-location">
                    <FaMapMarkerAlt /> {driver.currentLocation}
                  </span>
                </div>
              </div>
            </div>

            <div className="header-actions">
              <button 
                className={`status-toggle-btn ${onlineStatus ? 'online' : 'offline'}`}
                onClick={toggleOnlineStatus}
              >
                <div className="status-dot"></div>
                {onlineStatus ? 'Go Offline' : 'Go Online'}
              </button>
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
        {/* Active Ride Section */}
        {activeRide && (
          <div className="active-ride-section">
            <div className="section-header">
              <h2>
                <FaCar /> Active Ride
              </h2>
              <div className="ride-status">
                <span className="status-badge active">IN PROGRESS</span>
                <span className="ride-timer">
                  <FaClock /> Started 12 min ago
                </span>
              </div>
            </div>

            <div className="active-ride-card">
              <div className="ride-details">
                <div className="passenger-info">
                  <div className="passenger-avatar">
                    {activeRide.passengerName.charAt(0)}
                  </div>
                  <div className="passenger-details">
                    <h4>{activeRide.passengerName}</h4>
                    <div className="passenger-meta">
                      <span className="phone">
                        <FaPhone /> {activeRide.passengerPhone}
                      </span>
                      <span className="rating">
                        <FaStar /> 4.9
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ride-locations">
                  <div className="location-row">
                    <div className="location-marker pickup"></div>
                    <div className="location-details">
                      <p className="location-label">PICKUP</p>
                      <p className="location-address">{activeRide.pickup}</p>
                      <p className="location-time">
                        <FaClock /> {activeRide.pickupTime}
                      </p>
                    </div>
                  </div>

                  <div className="route-divider">
                    <div className="dotted-line"></div>
                    <FaRoad className="route-icon" />
                  </div>

                  <div className="location-row">
                    <div className="location-marker drop"></div>
                    <div className="location-details">
                      <p className="location-label">DESTINATION</p>
                      <p className="location-address">{activeRide.drop}</p>
                      <p className="location-eta">
                        <FaBolt /> ETA: {activeRide.estimatedDuration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ride-stats">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaRupeeSign />
                    </div>
                    <div>
                      <p className="stat-label">Fare</p>
                      <p className="stat-value">₹{activeRide.fare}</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <FaClock />
                    </div>
                    <div>
                      <p className="stat-label">Distance</p>
                      <p className="stat-value">15.2 km</p>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      {getVehicleIcon(driver.vehicle.type)}
                    </div>
                    <div>
                      <p className="stat-label">Vehicle</p>
                      <p className="stat-value">{driver.vehicle.model}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ride-actions">
                <button className="btn btn-primary">
                  <FaPhone /> Call Passenger
                </button>
                <button className="btn btn-secondary">
                  <FaShieldAlt /> Start Ride
                </button>
                <button className="btn btn-outline">
                  <FaExclamationTriangle /> Report Issue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="quick-stats-section">
          <h2 className="section-title">
            <FaTachometerAlt /> Today's Overview
          </h2>
          
          <div className="stats-grid">
            <div className="stat-card earnings">
              <div className="stat-header">
                <div className="stat-icon">
                  <FaRupeeSign />
                </div>
                <div className="stat-trend up">
                  <FaChartLine /> +12%
                </div>
              </div>
              <div className="stat-value">{formatCurrency(driver.todayEarnings)}</div>
              <p className="stat-label">Today's Earnings</p>
              <div className="stat-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${(driver.todayEarnings / 3000) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="stat-card rides">
              <div className="stat-header">
                <div className="stat-icon">
                  <FaCar />
                </div>
                <div className="stat-trend up">
                  <FaChartLine /> +2 rides
                </div>
              </div>
              <div className="stat-value">{driver.todayRides}</div>
              <p className="stat-label">Today's Rides</p>
              <div className="ride-breakdown">
                <span className="breakdown-item">Completed: 6</span>
                <span className="breakdown-item">Ongoing: 1</span>
                <span className="breakdown-item">Cancelled: 1</span>
              </div>
            </div>

            <div className="stat-card goal">
              <div className="stat-header">
                <div className="stat-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-trend">
                  {driver.weeklyProgress}%
                </div>
              </div>
              <div className="stat-value">{formatCurrency(driver.weeklyGoal)}</div>
              <p className="stat-label">Weekly Goal</p>
              <div className="goal-progress">
                <div className="progress-track">
                  <div 
                    className="progress-fill"
                    style={{ width: `${driver.weeklyProgress}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  ₹{Math.round((driver.weeklyGoal * driver.weeklyProgress) / 100)} earned
                </div>
              </div>
            </div>

            <div className="stat-card next-payout">
              <div className="stat-header">
                <div className="stat-icon">
                  <FaCreditCard />
                </div>
                <div className="stat-trend">
                  <FaCalendarAlt /> Mon
                </div>
              </div>
              <div className="stat-value">{formatCurrency(driver.nextPayment)}</div>
              <p className="stat-label">Next Payout</p>
              <button className="btn btn-sm btn-primary">
                <FaWallet /> Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Info & Quick Actions */}
        <div className="vehicle-actions-section">
          <div className="vehicle-info-card">
            <div className="section-header">
              <h3>
                <FaCar /> Vehicle Details
              </h3>
              <Link to="#" className="edit-link">
                Edit Details
              </Link>
            </div>
            
            <div className="vehicle-details">
              <div className="vehicle-image">
                {getVehicleIcon(driver.vehicle.type)}
              </div>
              <div className="vehicle-specs">
                <div className="spec-row">
                  <span className="spec-label">Model:</span>
                  <span className="spec-value">{driver.vehicle.model}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Color:</span>
                  <span className="spec-value">{driver.vehicle.color}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Plate No:</span>
                  <span className="spec-value">{driver.vehicle.plateNumber}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Year:</span>
                  <span className="spec-value">{driver.vehicle.year}</span>
                </div>
              </div>
            </div>

            <div className="vehicle-health">
              <div className="health-item">
                <FaGasPump className="health-icon" />
                <div>
                  <p className="health-label">Fuel</p>
                  <p className="health-value">65%</p>
                </div>
              </div>
              <div className="health-item">
                <FaTools className="health-icon" />
                <div>
                  <p className="health-label">Service Due</p>
                  <p className="health-value">15 days</p>
                </div>
              </div>
              <div className="health-item">
                <FaShieldAlt className="health-icon" />
                <div>
                  <p className="health-label">Insurance</p>
                  <p className="health-value">Valid</p>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions-card">
            <div className="section-header">
              <h3>
                <FaBolt /> Quick Actions
              </h3>
            </div>
            
            <div className="actions-grid">
              <Link to="/driver/available-rides" className="action-card primary">
                <div className="action-icon">
                  <FaCar />
                </div>
                <h4>Available Rides</h4>
                <p>Accept new ride requests</p>
                <span className="action-badge">12 new</span>
              </Link>

              <Link to="/driver/earnings" className="action-card">
                <div className="action-icon">
                  <FaWallet />
                </div>
                <h4>Earnings</h4>
                <p>View your earnings</p>
              </Link>

              <div className="action-card">
                <div className="action-icon">
                  <FaHistory />
                </div>
                <h4>Ride History</h4>
                <p>Past 30 days</p>
              </div>

              <div className="action-card">
                <div className="action-icon">
                  <FaUsers />
                </div>
                <h4>Support</h4>
                <p>24/7 driver support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity-section">
          <div className="section-header">
            <h3>
              <FaHistory /> Recent Activity
            </h3>
            <Link to="#" className="view-all-link">
              View All →
            </Link>
          </div>

          <div className="activity-list">
            <div className="activity-item completed">
              <div className="activity-icon">
                <FaCheckCircle />
              </div>
              <div className="activity-content">
                <p>Ride completed with Priya Patel</p>
                <small>Just now • ₹280 • Connaught Place to Noida</small>
              </div>
              <div className="activity-earnings">+₹280</div>
            </div>

            <div className="activity-item accepted">
              <div className="activity-icon">
                <FaCar />
              </div>
              <div className="activity-content">
                <p>Accepted ride from Rahul Sharma</p>
                <small>30 min ago • ₹350 • Hauz Khas to Gurugram</small>
              </div>
              <div className="activity-status">Ongoing</div>
            </div>

            <div className="activity-item payment">
              <div className="activity-icon">
                <FaCreditCard />
              </div>
              <div className="activity-content">
                <p>Weekly payout received</p>
                <small>2 hours ago • ₹12,500 • Bank Transfer</small>
              </div>
              <div className="activity-earnings">+₹12,500</div>
            </div>

            <div className="activity-item rating">
              <div className="activity-icon">
                <FaStar />
              </div>
              <div className="activity-content">
                <p>New 5-star rating from Ankit Verma</p>
                <small>4 hours ago • "Excellent service!"</small>
              </div>
              <div className="activity-rating">★★★★★</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="performance-section">
          <div className="section-header">
            <h3>
              <FaChartLine /> Performance Metrics
            </h3>
            <select className="time-filter">
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <h4>Acceptance Rate</h4>
              <div className="metric-value">94%</div>
              <div className="metric-progress">
                <div className="progress-bar" style={{ width: '94%' }}></div>
              </div>
              <p className="metric-trend up">+2% from last week</p>
            </div>

            <div className="metric-card">
              <h4>Cancellation Rate</h4>
              <div className="metric-value">3%</div>
              <div className="metric-progress">
                <div className="progress-bar danger" style={{ width: '3%' }}></div>
              </div>
              <p className="metric-trend down">-1% from last week</p>
            </div>

            <div className="metric-card">
              <h4>Average Rating</h4>
              <div className="metric-value">4.8</div>
              <div className="rating-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="metric-trend">Top 10% in Delhi</p>
            </div>

            <div className="metric-card">
              <h4>Peak Hours</h4>
              <div className="metric-value">8-10 AM</div>
              <div className="peak-hours">
                <span className="peak-badge">₹2,100 earned</span>
              </div>
              <p className="metric-trend">Most profitable time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;