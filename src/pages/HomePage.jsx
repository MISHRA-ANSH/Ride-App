// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaCar, 
//   FaUser, 
//   FaMapMarkerAlt, 
//   FaCreditCard,
//   FaSignInAlt,
//   FaUserPlus,
//   FaTaxi
// } from 'react-icons/fa';
// import './HomePage.css';

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       <nav className="home-nav">
//         <div className="container">
//           <div className="nav-content">
//             <h1 className="logo">
//               <FaTaxi className="logo-icon" /> RideBook
//             </h1>
//             <div className="nav-links">
//               <Link to="/login" className="btn btn-outline">
//                 <FaSignInAlt /> Login
//               </Link>
//               <Link to="/signup" className="btn btn-primary">
//                 <FaUserPlus /> Sign Up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <section className="hero-section">
//         <div className="container">
//           <div className="hero-content">
//             <h1>Book Rides, Earn Money</h1>
//             <p className="hero-subtitle">
//               India's most reliable ride booking system. 
//               Book rides as a user or accept rides as a driver.
//             </p>
            
//             <div className="hero-buttons">
//               <Link to="/user/book-ride" className="btn btn-primary btn-lg">
//                 <FaCar /> Book a Ride
//               </Link>
//               <Link to="/driver/dashboard" className="btn btn-secondary btn-lg">
//                 <FaUser /> Drive with Us
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="features-section">
//         <div className="container">
//           <h2 className="section-title">How It Works</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <FaMapMarkerAlt />
//               </div>
//               <h3>1. Enter Locations</h3>
//               <p>Enter pickup and drop locations. Get fare estimate instantly.</p>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <FaUser />
//               </div>
//               <h3>2. Driver Accepts</h3>
//               <p>Nearby available drivers will accept your ride request.</p>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <FaCar />
//               </div>
//               <h3>3. Ride Starts</h3>
//               <p>Track your ride in real-time. Know exact ETA.</p>
//             </div>
            
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <FaCreditCard />
//               </div>
//               <h3>4. Pay & Rate</h3>
//               <p>Pay securely after ride completion. Rate your experience.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="home-footer">
//         <div className="container">
//           <p>© 2024 RideBook. All rights reserved.</p>
//           <p>Advanced React Frontend Assignment - Ride Booking System</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCar, FaUser, FaMapMarkerAlt, FaCreditCard, FaSignInAlt, FaUserPlus, FaTaxi,
  FaShieldAlt, FaMobileAlt, FaStar, FaCity, FaDownload, FaCheckCircle, FaUsers
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="container">
          <div className="nav-content">
            <h1 className="logo">
              <FaTaxi className="logo-icon" /> Epic RideBook
            </h1>
            
            {/* Desktop Links */}
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/login" className="btn btn-outline">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                <FaUserPlus /> Sign Up
              </Link>
            </div>

            {/* Hamburger Button */}
            <div className="hamburger" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Book Rides, Earn Money</h1>
            <p className="hero-subtitle">
              India's most reliable ride booking system across 200+ cities. 
              Book rides as a user or accept rides as a driver.
            </p>
            
            <div className="hero-buttons">
              <Link to="/user/book-ride" className="btn btn-primary btn-lg">
                <FaCar /> Book a Ride
              </Link>
              <Link to="/driver/dashboard" className="btn btn-secondary btn-lg">
                <FaUser /> Drive with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <h3>40M+</h3>
              <p>Trusted Users</p>
            </div>
            <div className="stat-item">
              <FaCity className="stat-icon" />
              <h3>200+</h3>
              <p>Cities Served</p>
            </div>
            <div className="stat-item">
              <FaStar className="stat-icon" />
              <h3>4.8/5</h3>
              <p>Avg Rating</p>
            </div>
            <div className="stat-item">
              <FaCar className="stat-icon" />
              <h3>1M+</h3>
              <p>Rides Daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>1. Enter Locations</h3>
              <p>Enter pickup and drop locations. Get fare estimate instantly.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaUser />
              </div>
              <h3>2. Driver Accepts</h3>
              <p>Nearby available drivers will accept your ride request.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCar />
              </div>
              <h3>3. Ride Starts</h3>
              <p>Track your ride in real-time. Know exact ETA.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaCreditCard />
              </div>
              <h3>4. Pay & Rate</h3>
              <p>Pay securely after ride completion. Rate your experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="safety-section">
        <div className="container">
          <h2 className="section-title">Ride Safe with Us</h2>
          <div className="safety-features">
            <div className="safety-feature">
              <FaShieldAlt className="safety-icon" />
              <h4>SOS Button</h4>
              <p>Instant emergency help, 24/7.</p>
            </div>
            <div className="safety-feature">
              <FaCheckCircle className="safety-icon" />
              <h4>Verified Drivers</h4>
              <p>Background checked & licensed.</p>
            </div>
            <div className="safety-feature">
              <FaUsers className="safety-icon" />
              <h4>Share Trip</h4>
              <p>Share live location with family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Riders Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
              </div>
              <p>"Reliable rides every time. Clean cars and friendly drivers!"</p>
              <h5>- Priya S., Delhi</h5>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
                <FaStar className="star-icon" />
              </div>
              <p>"Easy booking and great earnings as a driver."</p>
              <h5>- Raj K., Mumbai</h5>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="app-download-section">
        <div className="container">
          <h2 className="section-title">Get the App</h2>
          <p>Download now for seamless booking on the go.</p>
          <div className="download-buttons">
            <Link to="#" className="btn btn-primary btn-lg">
              <FaMobileAlt /> App Store
            </Link>
            <Link to="#" className="btn btn-secondary btn-lg">
              <FaMobileAlt /> Play Store
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <p>© 2026 RideBook. All rights reserved.</p>
          <p>Advanced Epic Ride System - Ride Booking System</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
