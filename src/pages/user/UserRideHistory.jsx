// src/pages/user/UserRideHistory.jsx
import React from 'react';
import { FaHistory, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './UserRideHistory.css';

const UserRideHistory = () => {
  const rides = [
    {
      id: 'RIDE001',
      date: '2024-01-29T10:30:00Z',
      pickup: 'Connaught Place, New Delhi',
      drop: 'Noida Sector 62, Noida',
      fare: 350,
      status: 'completed',
      rideType: 'Sedan'
    },
    {
      id: 'RIDE002',
      date: '2024-01-28T18:30:00Z',
      pickup: 'Hauz Khas, Delhi',
      drop: 'Gurugram Sector 29',
      fare: 310,
      status: 'paid',
      rideType: 'Sedan'
    },
    {
      id: 'RIDE003',
      date: '2024-01-28T16:00:00Z',
      pickup: 'Koramangala, Bangalore',
      drop: 'Indiranagar, Bangalore',
      fare: 180,
      status: 'paid',
      rideType: 'Mini'
    },
    {
      id: 'RIDE004',
      date: '2024-01-27T14:30:00Z',
      pickup: 'South Extension, Delhi',
      drop: 'Rajouri Garden, Delhi',
      fare: 220,
      status: 'cancelled',
      rideType: 'Sedan'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-badge completed';
      case 'paid': return 'status-badge paid';
      case 'cancelled': return 'status-badge cancelled';
      default: return 'status-badge';
    }
  };

  return (
    <div className="ride-history-page">
      <div className="container">
        <h1 className="page-title">
          <FaHistory /> Ride History
        </h1>
        
        <div className="rides-summary">
          <div className="summary-card">
            <h3>Total Rides</h3>
            <div className="summary-value">12</div>
          </div>
          <div className="summary-card">
            <h3>Total Spent</h3>
            <div className="summary-value">₹4,250</div>
          </div>
          <div className="summary-card">
            <h3>This Month</h3>
            <div className="summary-value">4 rides</div>
          </div>
        </div>
        
        <div className="rides-table-container">
          <table className="rides-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Route</th>
                <th>Fare</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id}>
                  <td>
                    <div className="date-cell">
                      <FaCalendarAlt />
                      <span>{formatDate(ride.date)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="route-cell">
                      <div className="route-info">
                        <FaMapMarkerAlt className="pickup-icon" />
                        <span>{ride.pickup.split(',')[0]}</span>
                      </div>
                      <div className="route-info">
                        <FaMapMarkerAlt className="drop-icon" />
                        <span>{ride.drop.split(',')[0]}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="fare-cell">
                      <FaRupeeSign />
                      <span>{ride.fare}</span>
                    </div>
                  </td>
                  <td>
                    <span className="ride-type-badge">{ride.rideType}</span>
                  </td>
                  <td>
                    <span className={getStatusClass(ride.status)}>
                      {ride.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="history-actions">
          <button className="btn btn-outline">
            Download All Receipts
          </button>
          <button className="btn btn-primary">
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRideHistory;