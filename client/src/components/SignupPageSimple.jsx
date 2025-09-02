import React from 'react';
import { Link } from 'react-router-dom';
import './SignupPageGreen.css';
import NavBar from './NavBar';
import signupImage from '../images/signup.png';

function SignupPage() {
  const handleRoleSelection = (role) => {
    // For now, just navigate to respective pages or show forms
    if (role === 'instructor') {
      // Navigate to instructor signup form
      console.log('Selected: Instructor');
    } else if (role === 'learner') {
      // Navigate to learner signup form
      console.log('Selected: Learner');
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        {/* Left Side - Illustration */}
        <div className="signup-illustration-side">
          <div className="illustration-content">
            <img src={signupImage} alt="Learning Illustration" className="signup-illustration" />
            <div className="brand-text">
              <h1>SkillWise</h1>
              <p>Join thousands of learners and educators</p>
              <p>Building skills for tomorrow</p>
            </div>
          </div>
        </div>

        {/* Right Side - Role Selection */}
        <div className="signup-right-side">
          <div className="role-selection-container">
            <div className="selection-header">
              <h2>Join SkillWise</h2>
              <p>Choose how you want to get started</p>
            </div>

            <div className="role-cards">
              <div 
                className="role-card instructor-card"
                onClick={() => handleRoleSelection('instructor')}
              >
                <h3>I want to Teach</h3>
              </div>

              <div 
                className="role-card learner-card"
                onClick={() => handleRoleSelection('learner')}
              >
                <h3>I want to Learn</h3>
              </div>
            </div>

            <div className="login-link-section">
              <p>
                Already have an account? <Link to="/login" className="login-link">Sign in here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
