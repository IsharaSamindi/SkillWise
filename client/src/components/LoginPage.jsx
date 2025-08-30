
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import NavBar from './NavBar';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, redirect based on role
    if (formData.role === 'learner') {
      navigate('/learner-dashboard');
    } else if (formData.role === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/instructor-dashboard'); // Admin goes to instructor for now
    }
  };

  const fillDemoCredentials = () => {
    setFormData(prev => ({
      ...prev,
      email: 'demo@skillwise.com',
      password: 'demo123'
    }));
  };

  return (
    <div className="modern-login-page">
      {/* NavBar */}
      <NavBar />
      
      {/* Background */}
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="back-to-home">
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </Link>

      {/* Login Card */}
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo-section">
            <i className="fas fa-graduation-cap logo-icon"></i>
            <h1>SkillWise</h1>
          </div>
          <h2>Welcome back!</h2>
          <p>Sign in to continue your learning journey</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <i className="fas fa-lock input-icon"></i>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="role-selection">
            <label>Select Your Role</label>
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

          {/* Remember Me & Forgot Password */}
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>

          {/* Divider */}
          <div className="divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login Options */}
          <div className="social-login">
            <button type="button" className="social-btn google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button type="button" className="social-btn github">
              <i className="fab fa-github"></i>
              GitHub
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <div className="demo-info">
              <h4>Demo Credentials:</h4>
              <p>Email: demo@skillwise.com</p>
              <p>Password: demo123</p>
            </div>
            <button
              type="button"
              className="demo-btn"
              onClick={fillDemoCredentials}
            >
              Use Demo Login
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}
