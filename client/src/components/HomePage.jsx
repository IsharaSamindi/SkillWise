import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import NavBar from './NavBar';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* NavBar */}
      <NavBar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="floating-elements">
          <div className="floating-element element-1">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="floating-element element-2">
            <i className="fas fa-book"></i>
          </div>
          <div className="floating-element element-3">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div className="floating-element element-4">
            <i className="fas fa-users"></i>
          </div>
          <div className="floating-element element-5">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="floating-element element-6">
            <i className="fas fa-star"></i>
          </div>
        </div>
        
        <div className="hero-content">
          <h1>Master New Skills, Share Your Expertise</h1>
          <p>Connect with expert instructors and passionate learners in our comprehensive skill-sharing platform. Learn, teach, and grow together in a vibrant learning community.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              <i className="fas fa-rocket"></i>
              Start Learning
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              <i className="fas fa-chalkboard-teacher"></i>
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <h2>Three Ways to Experience SkillWise</h2>
            <p>Whether you're learning, teaching, or managing, we have the perfect role for you</p>
          </div>
          
          <div className="features-grid">
            {/* Learner Features */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>For Learners</h3>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Browse thousands of skill sessions</li>
                <li><i className="fas fa-check"></i> Filter by category, rating, and date</li>
                <li><i className="fas fa-check"></i> Enroll in sessions instantly</li>
                <li><i className="fas fa-check"></i> Leave reviews and ratings</li>
                <li><i className="fas fa-check"></i> Request new skills</li>
                <li><i className="fas fa-check"></i> Direct messaging with instructors</li>
                <li><i className="fas fa-check"></i> Track your learning progress</li>
              </ul>
            </div>

            {/* Instructor Features */}
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <h3>For Instructors</h3>
              <ul className="feature-list">
                <li><i className="fas fa-check"></i> Create and manage skill sessions</li>
                <li><i className="fas fa-check"></i> Upload materials (PDFs, videos, images)</li>
                <li><i className="fas fa-check"></i> Set pricing and skill levels</li>
                <li><i className="fas fa-check"></i> View enrolled learners</li>
                <li><i className="fas fa-check"></i> Communicate with students</li>
                <li><i className="fas fa-check"></i> Receive reviews and feedback</li>
                <li><i className="fas fa-check"></i> Build your teaching profile</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="section-title">
            <h2>Join Our Growing Community</h2>
            <p>Thousands of learners and instructors trust SkillWise</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">10,000+</div>
              <div>Active Learners</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">2,500+</div>
              <div>Expert Instructors</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">500+</div>
              <div>Skill Categories</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">50,000+</div>
              <div>Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join SkillWise today and unlock your potential</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-secondary">Get Started Now</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>SkillWise</h3>
              <p>Empowering learners and instructors to share knowledge and grow together in a secure, user-friendly environment.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 SkillWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}