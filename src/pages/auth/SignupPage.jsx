
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaUserTie,
  FaTaxi,
  FaShieldAlt,
  FaUserPlus,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSpinner
} from 'react-icons/fa';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'user',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const navigate = useNavigate();

  // Show driver info when driver type is selected
  useEffect(() => {
    setShowDriverInfo(formData.userType === 'driver');
  }, [formData.userType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Signup successful:', formData);
      setIsLoading(false);
      alert(`Account created as ${formData.userType}! Redirecting to login...`);
      navigate('/login');
    }, 1500);
  };

  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'user': return <FaUser />;
      case 'driver': return <FaTaxi />;
      case 'admin': return <FaShieldAlt />;
      default: return <FaUser />;
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordStrengthText = 
    passwordStrength === 0 ? 'None' :
    passwordStrength <= 2 ? 'Weak' :
    passwordStrength === 3 ? 'Medium' : 'Strong';

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          
          <div className="signup-header">
            <h1><FaUserPlus /> Create Account</h1>
            <p>Join RideBook today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && (
                <div className="error-message">
                  <FaExclamationTriangle /> {errors.name}
                </div>
              )}
            </div>
            
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <div className="error-message">
                  <FaExclamationTriangle /> {errors.email}
                </div>
              )}
            </div>
            
            {/* Phone Field with Country Code */}
            <div className="form-group">
              <label className="form-label">
                <FaPhone /> Phone Number
              </label>
              <div className="phone-input-container">
                <div className="country-code">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input phone-input ${errors.phone ? 'error' : ''}`}
                  placeholder="9876543210"
                  maxLength="10"
                  disabled={isLoading}
                />
              </div>
              {errors.phone && (
                <div className="error-message">
                  <FaExclamationTriangle /> {errors.phone}
                </div>
              )}
            </div>
            
            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">
                <FaLock /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a password"
                disabled={isLoading}
              />
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`strength-bar ${
                        i <= passwordStrength ? passwordStrengthText.toLowerCase() : ''
                      }`}
                    />
                  ))}
                  <small style={{ marginLeft: '0.5rem', color: 'var(--text-secondary)' }}>
                    {passwordStrengthText}
                  </small>
                </div>
              )}
              
              {errors.password && (
                <div className="error-message">
                  <FaExclamationTriangle /> {errors.password}
                </div>
              )}
            </div>
            
            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">
                <FaLock /> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <div className="error-message">
                  <FaExclamationTriangle /> {errors.confirmPassword}
                </div>
              )}
            </div>
            
            {/* User Type Selector */}
            <div className="form-group">
              <label className="form-label">Sign up as</label>
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
                      {type === 'driver' && (
                        <small className="user-type-note">(Requires verification)</small>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Driver Info Note */}
            {showDriverInfo && (
              <div className="driver-info-note">
                <h4><FaInfoCircle /> Driver Registration Info</h4>
                <ul>
                  <li>Valid driver's license required</li>
                  <li>Vehicle documents will be verified</li>
                  <li>Background check will be conducted</li>
                  <li>You'll receive driver kit after approval</li>
                </ul>
              </div>
            )}
            
            {/* Terms Checkbox */}
            <div className="terms-group">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="terms-checkbox"
                id="terms"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>. 
                I understand that my data will be processed according to these policies.
              </label>
            </div>
            {errors.agreeToTerms && (
              <div className="error-message" style={{ marginTop: '0.5rem' }}>
                <FaExclamationTriangle /> {errors.agreeToTerms}
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary signup-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="fa-spin" /> Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus /> Create Account
                </>
              )}
            </button>
          </form>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
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

export default SignupPage;