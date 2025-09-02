import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './LoginPageGreen.css';
import loginImage from '../images/login.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'learner',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Demo credentials for testing - Updated with real admin credentials
      const demoCredentials = {
        'demo@skillwise.com': 'demo123',
        'admin@skillwise.com': 'AdminPassword123!',
        'instructor@skillwise.com': 'instructor123',
        'learner@skillwise.com': 'learner123'
      };
      
      if (demoCredentials[formData.email] === formData.password) {
        // Redirect based on role
        if (formData.role === 'learner') {
          navigate('/learner-dashboard');
        } else if (formData.role === 'instructor') {
          navigate('/instructor-dashboard');
        } else if (formData.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/instructor-dashboard'); // fallback
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const demoCredentials = {
      'learner': { email: 'learner@skillwise.com', password: 'learner123', role: 'learner' },
      'instructor': { email: 'instructor@skillwise.com', password: 'instructor123', role: 'instructor' },
      'admin': { email: 'admin@skillwise.com', password: 'AdminPassword123!', role: 'admin' }
    };

    const cred = demoCredentials[role];
    setFormData(prev => ({
      ...prev,
      email: cred.email,
      password: cred.password,
      role: cred.role
    }));
  };

  return (
    <>
      <NavBar />
      <div className="green-login-container">
        {/* Left Side - Illustration */}
        <div className="login-illustration-side">
          <div className="illustration-content">
            <img src={loginImage} alt="Learning Illustration" className="login-illustration" />
            <div style={{textAlign: 'center', color: 'white'}}>
              <div style={{fontSize: '3rem', fontWeight: '800', margin: '0 0 1rem 0', fontFamily: 'Inter, sans-serif'}}>
                <span style={{color: '#10B981', WebkitTextFillColor: '#10B981', textShadow: 'none'}}>Skill</span><span style={{color: '#d1d5db', WebkitTextFillColor: '#d1d5db', textShadow: 'none'}}>Wise</span>
              </div>
              <p style={{fontSize: '1.2rem', fontWeight: '500', opacity: '0.9', color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'}}>Empowering Learning Through Technology</p>
            </div>
          </div>
        </div>

        {/* Right Side - Green Login Box */}
        <div className="login-right-side">
          <div className="green-login-box">
            <div className="login-box-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="simple-login-form">

              {/* General Error */}
              {errors.general && (
                <div className="error-message">
                  {errors.general}
                </div>
              )}

              {/* Username/Email Input */}
              <div className="input-group professional-input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Username or Email"
                  className={`professional-input${errors.email ? ' error' : ''}`}
                  required
                  autoComplete="username"
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* Password Input */}
              <div className="input-group professional-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`professional-input${errors.password ? ' error' : ''}`}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle professional-password-toggle attractive-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{border: '1px solid red'}}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash eye-icon" style={{color: '#2ecc71', fontSize: '1.2rem'}}></i>
                  ) : (
                    <i className="fas fa-eye eye-icon" style={{color: '#2ecc71', fontSize: '1.2rem'}}></i>
                  )}
                </button>
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              {/* Login Button */}
              <button 
                type="submit" 
                className="green-login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </>
                )}
              </button>

            </form>

            {/* Sign Up Link */}
            <div className="signup-link-section">
              <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
