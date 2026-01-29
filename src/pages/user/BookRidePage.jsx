// src/pages/user/BookRidePage.jsx
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCar, FaRupeeSign } from 'react-icons/fa';
import './BookRidePage.css';

const BookRidePage = () => {
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    rideType: 'sedan'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateFare = () => {
    const baseFare = 30;
    const perKm = 12;
    const distance = 15; // Mock distance
    let fare = baseFare + (distance * perKm);
    
    // Ride type multiplier
    const multipliers = {
      auto: 0.8,
      sedan: 1,
      suv: 1.5
    };
    
    fare *= multipliers[formData.rideType] || 1;
    fare = Math.max(fare, 50); // Minimum fare
    
    return Math.round(fare);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ride booked from ${formData.pickup} to ${formData.drop}! Fare: ₹${calculateFare()}`);
  };

  return (
    <div className="book-ride-page">
      <div className="container">
        <h1 className="page-title">
          <FaCar /> Book a Ride
        </h1>
        
        <div className="book-ride-card">
          <form onSubmit={handleSubmit} className="ride-form">
            <div className="form-group">
              <label className="form-label">
                <FaMapMarkerAlt /> Pickup Location
              </label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter pickup address"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaMapMarkerAlt /> Destination
              </label>
              <input
                type="text"
                name="drop"
                value={formData.drop}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter destination"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Ride Type</label>
              <div className="ride-type-selector">
                <label className={`ride-type-option ${formData.rideType === 'auto' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="rideType"
                    value="auto"
                    checked={formData.rideType === 'auto'}
                    onChange={handleChange}
                  />
                  <div className="ride-type-icon">🛺</div>
                  <span>Auto</span>
                  <small>80% of fare</small>
                </label>
                
                <label className={`ride-type-option ${formData.rideType === 'sedan' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="rideType"
                    value="sedan"
                    checked={formData.rideType === 'sedan'}
                    onChange={handleChange}
                  />
                  <div className="ride-type-icon">🚗</div>
                  <span>Sedan</span>
                  <small>Standard</small>
                </label>
                
                <label className={`ride-type-option ${formData.rideType === 'suv' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="rideType"
                    value="suv"
                    checked={formData.rideType === 'suv'}
                    onChange={handleChange}
                  />
                  <div className="ride-type-icon">🚙</div>
                  <span>SUV</span>
                  <small>1.5x fare</small>
                </label>
              </div>
            </div>
            
            <div className="fare-estimate">
              <h3>
                <FaRupeeSign /> Estimated Fare: ₹{calculateFare()}
              </h3>
              <p>Base fare: ₹30 + ₹12/km</p>
            </div>
            
            <button type="submit" className="btn btn-primary book-btn">
              Book Ride Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRidePage;