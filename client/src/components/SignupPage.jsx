import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupPageGreen.css';
import NavBar from './NavBar';
import signupImage from '../images/signup.png';

function SignupPage() {
  const [showLearnerForm, setShowLearnerForm] = useState(false);
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    // Instructor specific fields
    expertise: '',
    experience: '',
    bio: '',
    // Learner specific fields
    interests: '',
    learningGoals: '',
    address: '',
    phoneNumber: '',
    profilePhoto: null
  });

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
    if (role === 'instructor') {
      setShowInstructorForm(true);
      setShowLearnerForm(false);
      console.log('Selected: Instructor');
    } else if (role === 'learner') {
      setShowLearnerForm(true);
      setShowInstructorForm(false);
      console.log('Selected: Learner');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setFormData({ ...formData, profilePhoto: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Create FormData to handle file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('role', formData.role);
      
      // Add optional fields if they exist
      if (formData.address && formData.address.trim()) {
        formDataToSend.append('address', formData.address.trim());
      }
      if (formData.phoneNumber && formData.phoneNumber.trim()) {
        formDataToSend.append('phoneNumber', formData.phoneNumber.trim());
      }
      if (formData.profilePhoto) {
        formDataToSend.append('profilePhoto', formData.profilePhoto);
      }
      
      // Add role-specific fields
      if (formData.role === 'instructor') {
        if (formData.expertise) formDataToSend.append('expertise', formData.expertise);
        if (formData.experience) formDataToSend.append('experience', formData.experience);
        if (formData.bio) formDataToSend.append('bio', formData.bio);
      } else if (formData.role === 'learner') {
        if (formData.interests) formDataToSend.append('interests', formData.interests);
        if (formData.learningGoals) formDataToSend.append('learningGoals', formData.learningGoals);
      }

      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        // Don't set Content-Type header when using FormData
        body: formDataToSend,
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Account created successfully!');
        console.log('User created:', data);
        // Redirect to login or dashboard
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  };

  const goBack = () => {
    setShowLearnerForm(false);
    setShowInstructorForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      expertise: '',
      experience: '',
      bio: '',
      interests: '',
      learningGoals: '',
      address: '',
      phoneNumber: '',
      profilePhoto: null
    });
  };

  return (
    <>
      <NavBar />
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

      {/* Right Side - Role Selection or Forms */}
      <div className="signup-right-side">
        {!showLearnerForm && !showInstructorForm ? (
          // Role Selection View
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
        ) : (
          // Signup Form View
          <div className="signup-form-container">
            <div className="form-header">
              <button className="back-button" onClick={goBack}>
                <i className="fas fa-arrow-left"></i>
              </button>
              <h2>
                {showLearnerForm ? 'Create Learner Account' : 'Create Instructor Account'}
              </h2>
              <p>
                {showLearnerForm 
                  ? 'Start your learning journey today' 
                  : 'Share your knowledge with the world'
                }
              </p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Create a strong password"
                      minLength="6"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                      minLength="6"
                    />
                  </div>
                </div>
              </div>

              {/* Role-specific fields */}
              {showInstructorForm && (
                <div className="form-section">
                  <h3>Teaching Information</h3>
                  <div className="form-group">
                    <label htmlFor="expertise">Area of Expertise</label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      placeholder="e.g., Web Development, Data Science, Marketing"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience</label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="">Select experience level</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Brief Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about your background and what you'd like to teach"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              )}

              {showLearnerForm && (
                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  {/* Profile Photo Upload */}
                  <div className="form-group photo-upload-group">
                    <label htmlFor="profilePhoto">Profile Photo (Optional)</label>
                    <div className="photo-upload-container">
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="photo-input"
                      />
                      <label htmlFor="profilePhoto" className="photo-upload-label">
                        <i className="fas fa-camera"></i>
                        {formData.profilePhoto ? formData.profilePhoto.name : 'Choose Photo'}
                      </label>
                      {formData.profilePhoto && (
                        <div className="photo-preview">
                          <img 
                            src={URL.createObjectURL(formData.profilePhoto)} 
                            alt="Profile Preview" 
                            className="preview-image"
                          />
                          <button 
                            type="button" 
                            className="remove-photo-btn"
                            onClick={() => setFormData({ ...formData, profilePhoto: null })}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                    </div>
                    <small className="form-hint">Upload a profile picture (JPEG, PNG, or GIF, max 5MB)</small>
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label htmlFor="address">Address (Optional)</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your full address"
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., +1 (555) 123-4567"
                    />
                  </div>

                  <h3>Learning Preferences</h3>
                  <div className="form-group">
                    <label htmlFor="interests">Areas of Interest</label>
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      placeholder="e.g., Programming, Design, Business, Marketing"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="learningGoals">Learning Goals</label>
                    <textarea
                      id="learningGoals"
                      name="learningGoals"
                      value={formData.learningGoals}
                      onChange={handleInputChange}
                      placeholder="What do you hope to achieve through learning?"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="signup-submit-btn">
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </button>
              </div>

              {/* Login Link */}
              <div className="form-footer">
                <p>Already have an account? <Link to="/login" className="login-link">Sign in here</Link></p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default SignupPage;
