import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LearnerDashboard() {
  const [activeTab, setActiveTab] = useState('browse');
  const [availableCourses] = useState([
    {
      id: 1,
      title: 'Advanced Python Programming',
      instructor: 'Dr. Emily Johnson',
      rating: 4.9,
      students: 234,
      price: '$129',
      duration: '8 hours',
      level: 'Advanced',
      image: '🐍',
      description: 'Master advanced Python concepts and build real-world applications.'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Wilson',
      rating: 4.7,
      students: 156,
      price: '$89',
      duration: '6 hours',
      level: 'Beginner',
      image: '🎨',
      description: 'Learn the basics of user interface and user experience design.'
    },
    {
      id: 3,
      title: 'Data Science with R',
      instructor: 'Prof. Michael Chen',
      rating: 4.8,
      students: 189,
      price: '$149',
      duration: '10 hours',
      level: 'Intermediate',
      image: '📊',
      description: 'Analyze data and create visualizations using R programming.'
    }
  ]);

  const [enrolledCourses] = useState([
    {
      id: 1,
      title: 'React Development Masterclass',
      instructor: 'John Doe',
      progress: 75,
      nextSession: '2025-08-28',
      status: 'In Progress',
      image: '⚛️'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      instructor: 'Jane Smith',
      progress: 100,
      completedDate: '2025-08-20',
      status: 'Completed',
      image: '🟨'
    }
  ]);

  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    price: 'all'
  });

  return (
    <div className="learner-dashboard">
      {/* Navigation */}
      <nav className="dashboard-navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          SkillWise
        </Link>
        <div className="navbar-links">
          <span className="user-greeting">Welcome, Alex Smith 👨‍🎓</span>
          <Link to="/login" className="nav-link">Logout</Link>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="profile-avatar">👨‍🎓</div>
            <h3>Alex Smith</h3>
            <p>Learner</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-number">3</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'browse' ? 'active' : ''}`}
              onClick={() => setActiveTab('browse')}
            >
              <span className="nav-icon">🔍</span>
              Browse Courses
            </button>
            <button 
              className={`nav-item ${activeTab === 'enrolled' ? 'active' : ''}`}
              onClick={() => setActiveTab('enrolled')}
            >
              <span className="nav-icon">📚</span>
              My Courses
            </button>
            <button 
              className={`nav-item ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <span className="nav-icon">📈</span>
              Progress
            </button>
            <button 
              className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveTab('certificates')}
            >
              <span className="nav-icon">🏆</span>
              Certificates
            </button>
            <button 
              className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <span className="nav-icon">⭐</span>
              My Reviews
            </button>
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">⚙️</span>
              Profile
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Browse Courses Tab */}
          {activeTab === 'browse' && (
            <div className="browse-content">
              <div className="page-header">
                <h1>Browse Available Courses</h1>
                <div className="search-bar">
                  <input type="text" placeholder="Search courses..." />
                  <button className="search-btn">🔍</button>
                </div>
              </div>

              {/* Filters */}
              <div className="filters-section">
                <div className="filter-group">
                  <label>Category:</label>
                  <select value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                    <option value="all">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="data">Data Science</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Level:</label>
                  <select value={filters.level} onChange={(e) => setFilters({...filters, level: e.target.value})}>
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Price:</label>
                  <select value={filters.price} onChange={(e) => setFilters({...filters, price: e.target.value})}>
                    <option value="all">All Prices</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="courses-grid">
                {availableCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-image">
                      <span className="course-emoji">{course.image}</span>
                      <div className="course-level">{course.level}</div>
                    </div>
                    <div className="course-content">
                      <h3>{course.title}</h3>
                      <p className="instructor">👨‍🏫 {course.instructor}</p>
                      <p className="course-description">{course.description}</p>
                      
                      <div className="course-stats">
                        <div className="stat">
                          <span className="stat-icon">⭐</span>
                          <span>{course.rating}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">👥</span>
                          <span>{course.students}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-icon">⏱️</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <div className="course-footer">
                        <div className="course-price">{course.price}</div>
                        <button className="enroll-btn">
                          <span className="btn-icon">🎯</span>
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Courses Tab */}
          {activeTab === 'enrolled' && (
            <div className="enrolled-content">
              <div className="page-header">
                <h1>My Enrolled Courses</h1>
                <div className="course-filters">
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">In Progress</button>
                  <button className="filter-btn">Completed</button>
                </div>
              </div>

              <div className="enrolled-courses">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card">
                    <div className="course-image">
                      <span className="course-emoji">{course.image}</span>
                    </div>
                    <div className="course-info">
                      <h3>{course.title}</h3>
                      <p className="instructor">👨‍🏫 {course.instructor}</p>
                      <div className="course-status">
                        <span className={`status-badge ${course.status.toLowerCase().replace(' ', '-')}`}>
                          {course.status}
                        </span>
                      </div>
                    </div>
                    <div className="course-progress">
                      {course.status === 'In Progress' ? (
                        <>
                          <div className="progress-info">
                            <span>Progress: {course.progress}%</span>
                            <span>Next: {course.nextSession}</span>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                          </div>
                        </>
                      ) : (
                        <div className="completed-info">
                          <span className="completion-icon">✅</span>
                          <span>Completed: {course.completedDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="course-actions">
                      {course.status === 'In Progress' ? (
                        <button className="continue-btn">▶️ Continue</button>
                      ) : (
                        <>
                          <button className="certificate-btn">🏆 Certificate</button>
                          <button className="review-btn">⭐ Review</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="progress-content">
              <div className="page-header">
                <h1>Learning Progress</h1>
              </div>

              <div className="progress-overview">
                <div className="progress-stats">
                  <div className="progress-stat">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                      <h3>5</h3>
                      <p>Courses Enrolled</p>
                    </div>
                  </div>
                  <div className="progress-stat">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                      <h3>3</h3>
                      <p>Completed</p>
                    </div>
                  </div>
                  <div className="progress-stat">
                    <div className="stat-icon">⏱️</div>
                    <div className="stat-info">
                      <h3>42h</h3>
                      <p>Learning Time</p>
                    </div>
                  </div>
                  <div className="progress-stat">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-info">
                      <h3>3</h3>
                      <p>Certificates</p>
                    </div>
                  </div>
                </div>

                <div className="learning-streak">
                  <h3>🔥 Learning Streak</h3>
                  <div className="streak-counter">
                    <span className="streak-number">7</span>
                    <span className="streak-text">days</span>
                  </div>
                  <p>Keep it up! You're on fire! 🚀</p>
                </div>
              </div>

              <div className="skill-progress">
                <h3>Skill Development</h3>
                <div className="skills-list">
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">React Development</span>
                      <span className="skill-level">75%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">JavaScript</span>
                      <span className="skill-level">90%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">Python</span>
                      <span className="skill-level">60%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div className="certificates-content">
              <div className="page-header">
                <h1>My Certificates</h1>
                <button className="share-btn">📤 Share All</button>
              </div>

              <div className="certificates-grid">
                <div className="certificate-card">
                  <div className="certificate-header">
                    <span className="certificate-icon">🏆</span>
                    <h3>JavaScript Fundamentals</h3>
                  </div>
                  <div className="certificate-body">
                    <p className="instructor">Instructor: Jane Smith</p>
                    <p className="completion-date">Completed: August 20, 2025</p>
                    <p className="grade">Grade: A+ (95%)</p>
                  </div>
                  <div className="certificate-actions">
                    <button className="download-btn">⬇️ Download</button>
                    <button className="share-btn">📤 Share</button>
                    <button className="verify-btn">✅ Verify</button>
                  </div>
                </div>

                <div className="certificate-card">
                  <div className="certificate-header">
                    <span className="certificate-icon">🏆</span>
                    <h3>Python Basics</h3>
                  </div>
                  <div className="certificate-body">
                    <p className="instructor">Instructor: Dr. Mike Johnson</p>
                    <p className="completion-date">Completed: July 15, 2025</p>
                    <p className="grade">Grade: A (88%)</p>
                  </div>
                  <div className="certificate-actions">
                    <button className="download-btn">⬇️ Download</button>
                    <button className="share-btn">📤 Share</button>
                    <button className="verify-btn">✅ Verify</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="page-header">
                <h1>My Reviews</h1>
                <p>Share your experience to help other learners</p>
              </div>

              <div className="review-form">
                <h3>Leave a Review</h3>
                <form className="review-form-content">
                  <div className="form-group">
                    <label>Select Course</label>
                    <select>
                      <option>React Development Masterclass</option>
                      <option>JavaScript Fundamentals</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Rating</label>
                    <div className="rating-input">
                      <span className="star">⭐</span>
                      <span className="star">⭐</span>
                      <span className="star">⭐</span>
                      <span className="star">⭐</span>
                      <span className="star">⭐</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Your Review</label>
                    <textarea placeholder="Share your experience..." rows="4"></textarea>
                  </div>
                  <button type="submit" className="submit-review-btn">Submit Review</button>
                </form>
              </div>

              <div className="my-reviews">
                <h3>Previous Reviews</h3>
                <div className="review-item">
                  <div className="review-header">
                    <h4>JavaScript Fundamentals</h4>
                    <div className="review-rating">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="review-text">"Excellent course! The instructor explained complex concepts clearly."</p>
                  <div className="review-footer">
                    <span className="review-date">August 20, 2025</span>
                    <button className="edit-review-btn">✏️ Edit</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-content">
              <div className="page-header">
                <h1>Profile Settings</h1>
                <button className="primary-btn">Save Changes</button>
              </div>

              <div className="profile-form">
                <div className="profile-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" defaultValue="Alex Smith" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="alex@email.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea rows="3" defaultValue="Passionate learner interested in web development and data science..." />
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Learning Preferences</h3>
                  <div className="form-group">
                    <label>Interested Topics</label>
                    <div className="interest-tags">
                      <span className="tag">JavaScript</span>
                      <span className="tag">Python</span>
                      <span className="tag">React</span>
                      <span className="tag">Data Science</span>
                      <button className="add-tag-btn">+ Add</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Learning Goals</label>
                    <textarea rows="3" placeholder="What do you want to achieve?"></textarea>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Notifications</h3>
                  <div className="notification-settings">
                    <label className="notification-item">
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for new courses</span>
                    </label>
                    <label className="notification-item">
                      <input type="checkbox" defaultChecked />
                      <span>Reminders for upcoming sessions</span>
                    </label>
                    <label className="notification-item">
                      <input type="checkbox" />
                      <span>Weekly progress reports</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
