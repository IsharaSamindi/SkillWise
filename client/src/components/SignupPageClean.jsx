import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPageGreen.css';
import signupImage from '../images/signup.png';

function SignupPage() {
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const [showInstructorForm, setShowInstructorForm] = useState(false);

  const handleRoleSelection = (role) => {
    if (role === 'instructor') {
      setShowInstructorForm(true);
      console.log('Selected: Instructor');
    } else if (role === 'learner') {
      setShowLearnerForm(true);
      console.log('Selected: Learner');
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side - Illustration */}
      <div className="signup-illustration-side">
        <div className="illustration-content">
          <img src={signupImage} alt="Join SkillWise" className="signup-illustration" />
          <div className="brand-text">
            <h1>
              <span style={{color: '#10B981', WebkitTextFillColor: '#10B981'}}>Skill</span><span style={{color: '#6B7280', WebkitTextFillColor: '#6B7280'}}>Wise</span>
            </h1>
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
            {/* Learner Card */}
            <div className="role-card learner-card" onClick={() => handleRoleSelection('learner')}>
              <div className="card-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>I want to Learn</h3>
              <p>Discover new skills, advance your career, and unlock your potential</p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Access thousands of courses</li>
                <li><i className="fas fa-check"></i> Learn at your own pace</li>
                <li><i className="fas fa-check"></i> Get certificates</li>
                <li><i className="fas fa-check"></i> Join community discussions</li>
              </ul>
              <button className="role-button">
                Get Started Learning
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Instructor Card */}
            <div className="role-card instructor-card" onClick={() => handleRoleSelection('instructor')}>
              <div className="card-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>I want to Teach</h3>
              <p>Share your expertise, inspire others, and build your teaching business</p>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Create and sell courses</li>
                <li><i className="fas fa-check"></i> Reach global audience</li>
                <li><i className="fas fa-check"></i> Earn passive income</li>
                <li><i className="fas fa-check"></i> Build your brand</li>
              </ul>
              <button className="role-button">
                Start Teaching
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="login-link-section">
            <p>Already have an account? <Link to="/login" className="login-link">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
