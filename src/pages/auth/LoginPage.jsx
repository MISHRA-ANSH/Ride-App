// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaTaxi, 
  FaShieldAlt,
  FaSignInAlt,
  FaArrowLeft,
  FaSpinner,
  FaExclamationCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(formData.email, formData.password, formData.userType);
      
      if (result.success) {
        // Redirect based on user type
        if (result.userType === 'user') {
          navigate('/user/dashboard');
        } else if (result.userType === 'driver') {
          navigate('/driver/dashboard');
        } else if (result.userType === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'user': return <FaUser />;
      case 'driver': return <FaTaxi />;
      case 'admin': return <FaShieldAlt />;
      default: return <FaUser />;
    }
  };

  // Demo credentials for quick login
  const handleDemoLogin = (type) => {
    let credentials = {};
    
    switch(type) {
      case 'user':
        credentials = { email: 'rahul@example.com', password: 'password123' };
        break;
      case 'driver':
        credentials = { email: 'raj.driver@example.com', password: 'driver123' };
        break;
      case 'admin':
        credentials = { email: 'admin@ridebook.com', password: 'admin123' };
        break;
    }
    
    setFormData({
      email: credentials.email,
      password: credentials.password,
      userType: type
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          
          <div className="login-header">
            <h1><FaSignInAlt /> Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>
          
          {/* Demo Login Buttons */}
          <div className="demo-login-section">
            <p className="demo-label">Quick Demo Login:</p>
            <div className="demo-buttons">
              <button 
                className="demo-btn user"
                onClick={() => handleDemoLogin('user')}
                disabled={isLoading}
              >
                <FaUser /> User
              </button>
              <button 
                className="demo-btn driver"
                onClick={() => handleDemoLogin('driver')}
                disabled={isLoading}
              >
                <FaTaxi /> Driver
              </button>
              <button 
                className="demo-btn admin"
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
              >
                <FaShieldAlt /> Admin
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">
                <FaLock /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Login as</label>
              <div className="user-type-selector">
                {['user', 'driver', 'admin'].map(type => (
                  <label 
                    key={type} 
                    className={`user-type-option ${formData.userType === type ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type}
                      checked={formData.userType === type}
                      onChange={handleChange}
                      className="user-type-radio"
                      disabled={isLoading}
                    />
                    <div className="user-type-content">
                      <div className="user-type-icon">
                        {getUserTypeIcon(type)}
                      </div>
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="error-message">
                <FaExclamationCircle /> {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="fa-spin" /> Signing In...
                </>
              ) : (
                <>
                  <FaSignInAlt /> Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <p>
              <Link to="/">
                <FaArrowLeft /> Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;