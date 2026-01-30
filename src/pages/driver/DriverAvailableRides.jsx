import React, { useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaRupeeSign, FaClock, FaUser, FaStar, FaFilter } from 'react-icons/fa';
import './DriverAvailableRides.css';

const DriverAvailableRides = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const rides = [
    {
      id: 'RIDE001',
      pickup: 'Connaught Place, New Delhi',
      drop: 'Noida Sector 62, Noida',
      fare: 350,
      distance: '15.2 km',
      estimatedTime: '45 min',
      passenger: {
        name: 'Rahul Sharma',
        rating: 4.8
      },
      rideType: 'Sedan',
      timeAgo: '2 min ago'
    },
    {
      id: 'RIDE002',
      pickup: 'Hauz Khas, Delhi',
      drop: 'Gurugram Sector 29',
      fare: 280,
      distance: '8.5 km',
      estimatedTime: '25 min',
      passenger: {
        name: 'Priya Patel',
        rating: 4.9
      },
      rideType: 'Sedan',
      timeAgo: '5 min ago'
    },
    {
      id: 'RIDE003',
      pickup: 'MG Road, Bangalore',
      drop: 'Electronic City, Bangalore',
      fare: 420,
      distance: '22.3 km',
      estimatedTime: '55 min',
      passenger: {
        name: 'Ankit Verma',
        rating: 4.7
      },
      rideType: 'SUV',
      timeAgo: '8 min ago'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Rides' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'premium', label: 'Premium' },
    { id: 'shared', label: 'Shared' }
  ];

  const handleAcceptRide = (rideId) => {
    alert(`Ride ${rideId} accepted!`);
  };

  return (
    <div className="available-rides-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <FaCar /> Available Rides
          </h1>
          <p>Accept new ride requests in your area</p>
        </div>

        <div className="filters-section">
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <FaFilter /> {filter.label}
              </button>
            ))}
          </div>
          
          <div className="location-info">
            <FaMapMarkerAlt /> Current Location: Dwarka, Delhi
          </div>
        </div>

        <div className="rides-list">
          {rides.map(ride => (
            <div key={ride.id} className="ride-card">
              <div className="ride-header">
                <div className="ride-id">
                  <FaCar /> Ride #{ride.id}
                </div>
                <div className="ride-time">
                  <FaClock /> {ride.timeAgo}
                </div>
              </div>

              <div className="ride-details">
                <div className="locations">
                  <div className="location">
                    <div className="location-marker pickup"></div>
                    <div className="location-text">
                      <p className="location-label">Pickup</p>
                      <p className="location-address">{ride.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="route-line"></div>
                  
                  <div className="location">
                    <div className="location-marker drop"></div>
                    <div className="location-text">
                      <p className="location-label">Drop</p>
                      <p className="location-address">{ride.drop}</p>
                    </div>
                  </div>
                </div>

                <div className="ride-info">
                  <div className="info-item">
                    <FaRupeeSign />
                    <span>₹{ride.fare}</span>
                  </div>
                  <div className="info-item">
                    <FaCar />
                    <span>{ride.distance}</span>
                  </div>
                  <div className="info-item">
                    <FaClock />
                    <span>{ride.estimatedTime}</span>
                  </div>
                  <div className="info-item">
                    <FaCar />
                    <span>{ride.rideType}</span>
                  </div>
                </div>

                <div className="passenger-info">
                  <div className="passenger-details">
                    <FaUser className="passenger-icon" />
                    <div>
                      <p className="passenger-name">{ride.passenger.name}</p>
                      <div className="passenger-rating">
                        <FaStar /> {ride.passenger.rating}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="btn btn-primary accept-btn"
                    onClick={() => handleAcceptRide(ride.id)}
                  >
                    Accept Ride
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="no-rides-message">
          <p>Looking for more rides in your area...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAvailableRides;