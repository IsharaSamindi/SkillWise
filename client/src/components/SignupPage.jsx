import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupPage.css';
import NavBar from './NavBar';

export default function SignupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // For demo purposes, redirect based on role
    if (formData.role === 'learner') {
      navigate('/learner-dashboard');
    } else if (formData.role === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/instructor-dashboard'); // Admin goes to instructor for now
    }
  };

  return (
    <div className="modern-signup-page">
      {/* NavBar */}
      <NavBar />
      
      {/* Background */}
      <div className="signup-background">
        <div className="gradient-overlay"></div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="back-to-home">
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </Link>

      {/* Signup Card */}
      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <div className="logo-section">
            <i className="fas fa-graduation-cap logo-icon"></i>
            <h1>SkillWise</h1>
          </div>
          <h2>Join Our Community!</h2>
          <p>Start your learning or teaching journey today</p>
          
          {/* Progress Steps */}
          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>
        </div>

        {/* Signup Form */}
        <form className="signup-form">
          {currentStep === 1 && (
            <>
              {/* Role Selection */}
              <div className="role-selection">
                <label>Choose Your Role</label>
                <div className="role-buttons">
                  <button
                    type="button"
                    className={`role-btn ${formData.role === 'learner' ? 'active' : ''}`}
                    onClick={() => handleRoleSelect('learner')}
                  >
                    <i className="fas fa-user-graduate"></i>
                    <span>Learner</span>
                  </button>
                  <button
                    type="button"
                    className={`role-btn ${formData.role === 'instructor' ? 'active' : ''}`}
                    onClick={() => handleRoleSelect('instructor')}
                  >
                    <i className="fas fa-chalkboard-teacher"></i>
                    <span>Instructor</span>
                  </button>
                  <button
                    type="button"
                    className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                    onClick={() => handleRoleSelect('admin')}
                  >
                    <i className="fas fa-cog"></i>
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="name-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                    <i className="fas fa-user input-icon"></i>
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                    <i className="fas fa-user input-icon"></i>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="input-group">
                <label htmlFor="email">Email Address *</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                  <i className="fas fa-envelope input-icon"></i>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Password Fields */}
              <div className="input-group">
                <label htmlFor="password">Password *</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    required
                  />
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <i className="fas fa-lock input-icon"></i>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkmark"></span>
                  I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </label>
              </div>
            </>
          )}

          {/* Next Step Button */}
          <button type="button" className="next-step-btn" onClick={handleNextStep}>
            {currentStep === 1 ? 'Next Step' : 'Create Account'}
            <i className="fas fa-arrow-right"></i>
          </button>

          {/* Social Signup Options */}
          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-signup">
            <button type="button" className="social-btn google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button type="button" className="social-btn github">
              <i className="fab fa-github"></i>
              GitHub
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="login-prompt">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}