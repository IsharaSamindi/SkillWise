import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sessions, setSessions] = useState([
    {
      id: 1,
      title: 'React Development Masterclass',
      students: 24,
      rating: 4.8,
      price: '$99',
      status: 'active',
      date: '2025-09-01'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      students: 18,
      rating: 4.6,
      price: '$79',
      status: 'draft',
      date: '2025-09-15'
    }
  ]);

  const [reviews] = useState([
    {
      id: 1,
      student: 'Sarah Johnson',
      course: 'React Development Masterclass',
      rating: 5,
      comment: 'Excellent course! Very detailed and practical.',
      date: '2025-08-20'
    },
    {
      id: 2,
      student: 'Mike Chen',
      course: 'React Development Masterclass',
      rating: 4,
      comment: 'Great instructor, learned a lot!',
      date: '2025-08-18'
    }
  ]);

  return (
    <div className="instructor-dashboard">
      {/* Navigation */}
      <nav className="dashboard-navbar">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          SkillWise
        </Link>
        <div className="navbar-links">
          <span className="user-greeting">Welcome, John Doe 👨‍🏫</span>
          <Link to="/login" className="nav-link">Logout</Link>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="profile-avatar">👨‍🏫</div>
            <h3>John Doe</h3>
            <p>Senior Instructor</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">42</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'sessions' ? 'active' : ''}`}
              onClick={() => setActiveTab('sessions')}
            >
              <span className="nav-icon">📚</span>
              My Sessions
            </button>
            <button 
              className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              <span className="nav-icon">👥</span>
              Students
            </button>
            <button 
              className={`nav-item ${activeTab === 'materials' ? 'active' : ''}`}
              onClick={() => setActiveTab('materials')}
            >
              <span className="nav-icon">📁</span>
              Materials
            </button>
            <button 
              className={`nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <span className="nav-icon">⭐</span>
              Reviews
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="page-header">
                <h1>Dashboard Overview</h1>
                <button className="primary-btn">
                  <span className="btn-icon">➕</span>
                  Create New Session
                </button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>42</h3>
                    <p>Total Students</p>
                  </div>
                  <div className="stat-trend positive">↗️ +5 this week</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📚</div>
                  <div className="stat-info">
                    <h3>3</h3>
                    <p>Active Sessions</p>
                  </div>
                  <div className="stat-trend">📈 2 drafts</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <h3>$2,340</h3>
                    <p>This Month</p>
                  </div>
                  <div className="stat-trend positive">↗️ +15%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <h3>4.8</h3>
                    <p>Avg Rating</p>
                  </div>
                  <div className="stat-trend positive">🎉 Excellent</div>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-content">
                      <p><strong>Sarah Johnson</strong> enrolled in React Masterclass</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">⭐</div>
                    <div className="activity-content">
                      <p><strong>Mike Chen</strong> left a 5-star review</p>
                      <span className="activity-time">5 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">💰</div>
                    <div className="activity-content">
                      <p>Payment received: <strong>$99</strong></p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="sessions-content">
              <div className="page-header">
                <h1>My Sessions</h1>
                <button className="primary-btn">
                  <span className="btn-icon">➕</span>
                  Create Session
                </button>
              </div>

              <div className="sessions-grid">
                {sessions.map(session => (
                  <div key={session.id} className="session-card">
                    <div className="session-header">
                      <h3>{session.title}</h3>
                      <span className={`status-badge ${session.status}`}>
                        {session.status}
                      </span>
                    </div>
                    <div className="session-stats">
                      <div className="session-stat">
                        <span className="stat-icon">👥</span>
                        <span>{session.students} students</span>
                      </div>
                      <div className="session-stat">
                        <span className="stat-icon">⭐</span>
                        <span>{session.rating}</span>
                      </div>
                      <div className="session-stat">
                        <span className="stat-icon">💰</span>
                        <span>{session.price}</span>
                      </div>
                    </div>
                    <div className="session-date">
                      📅 {session.date}
                    </div>
                    <div className="session-actions">
                      <button className="edit-btn">✏️ Edit</button>
                      <button className="view-btn">👁️ View</button>
                      <button className="delete-btn">🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="create-session-form" style={{ marginTop: '2rem' }}>
                <h2>Create New Session</h2>
                <form className="session-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Session Title</label>
                      <input type="text" placeholder="Enter session title" />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="number" placeholder="$0" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your session..." rows="3"></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input type="date" />
                    </div>
                    <div className="form-group">
                      <label>Duration (hours)</label>
                      <input type="number" placeholder="2" />
                    </div>
                    <div className="form-group">
                      <label>Skill Level</label>
                      <select>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="secondary-btn">Save Draft</button>
                    <button type="submit" className="primary-btn">Publish Session</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="students-content">
              <div className="page-header">
                <h1>Enrolled Students</h1>
                <div className="search-bar">
                  <input type="text" placeholder="Search students..." />
                  <button className="search-btn">🔍</button>
                </div>
              </div>

              <div className="students-table">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Enrolled Date</th>
                      <th>Progress</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="student-info">
                          <div className="student-avatar">👩‍💻</div>
                          <div>
                            <div className="student-name">Sarah Johnson</div>
                            <div className="student-email">sarah@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td>React Masterclass</td>
                      <td>Aug 15, 2025</td>
                      <td>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '75%'}}></div>
                        </div>
                        <span className="progress-text">75%</span>
                      </td>
                      <td>
                        <button className="message-btn">💬 Message</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="student-info">
                          <div className="student-avatar">👨‍💻</div>
                          <div>
                            <div className="student-name">Mike Chen</div>
                            <div className="student-email">mike@email.com</div>
                          </div>
                        </div>
                      </td>
                      <td>JavaScript Fundamentals</td>
                      <td>Aug 10, 2025</td>
                      <td>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '45%'}}></div>
                        </div>
                        <span className="progress-text">45%</span>
                      </td>
                      <td>
                        <button className="message-btn">💬 Message</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div className="materials-content">
              <div className="page-header">
                <h1>Course Materials</h1>
                <button className="primary-btn">
                  <span className="btn-icon">⬆️</span>
                  Upload Material
                </button>
              </div>

              <div className="materials-grid">
                <div className="material-card">
                  <div className="material-icon">📄</div>
                  <div className="material-info">
                    <h4>React Basics Guide.pdf</h4>
                    <p>PDF • 2.3 MB • React Masterclass</p>
                    <span className="upload-date">Uploaded Aug 15, 2025</span>
                  </div>
                  <div className="material-actions">
                    <button className="view-btn">👁️</button>
                    <button className="download-btn">⬇️</button>
                    <button className="delete-btn">🗑️</button>
                  </div>
                </div>

                <div className="material-card">
                  <div className="material-icon">🎥</div>
                  <div className="material-info">
                    <h4>Introduction Video.mp4</h4>
                    <p>Video • 45.2 MB • React Masterclass</p>
                    <span className="upload-date">Uploaded Aug 12, 2025</span>
                  </div>
                  <div className="material-actions">
                    <button className="view-btn">👁️</button>
                    <button className="download-btn">⬇️</button>
                    <button className="delete-btn">🗑️</button>
                  </div>
                </div>

                <div className="upload-area">
                  <div className="upload-icon">⬆️</div>
                  <h4>Upload New Material</h4>
                  <p>Drag and drop files here or click to browse</p>
                  <input type="file" multiple hidden id="file-upload" />
                  <label htmlFor="file-upload" className="upload-btn">Choose Files</label>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="page-header">
                <h1>Student Reviews</h1>
                <div className="rating-overview">
                  <div className="overall-rating">
                    <span className="rating-number">4.8</span>
                    <div className="rating-stars">
                      ⭐⭐⭐⭐⭐
                    </div>
                    <span className="rating-text">Excellent</span>
                  </div>
                </div>
              </div>

              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">👤</div>
                        <div>
                          <h4>{review.student}</h4>
                          <p>{review.course}</p>
                        </div>
                      </div>
                      <div className="review-rating">
                        <div className="stars">
                          {'⭐'.repeat(review.rating)}
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                    </div>
                    <div className="review-content">
                      <p>"{review.comment}"</p>
                    </div>
                    <div className="review-actions">
                      <button className="reply-btn">💬 Reply</button>
                      <button className="helpful-btn">👍 Helpful</button>
                    </div>
                  </div>
                ))}
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
                      <input type="text" defaultValue="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="john@email.com" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea rows="4" defaultValue="Experienced React developer with 5+ years in web development..." />
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Expertise Areas</h3>
                  <div className="expertise-tags">
                    <span className="tag">React</span>
                    <span className="tag">JavaScript</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">TypeScript</span>
                    <button className="add-tag-btn">+ Add</button>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Social Links</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>LinkedIn</label>
                      <input type="url" placeholder="https://linkedin.com/in/johndoe" />
                    </div>
                    <div className="form-group">
                      <label>GitHub</label>
                      <input type="url" placeholder="https://github.com/johndoe" />
                    </div>
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
