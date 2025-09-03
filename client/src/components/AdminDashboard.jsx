import React from 'react';
import NavBar from './NavBar';

const AdminDashboard = () => {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard!</p>
        <p style={{ color: '#666' }}>Full admin functionality will be restored soon.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required');
        return;
      }

      // Fetch users and stats
      const [usersResponse, statsResponse] = await Promise.all([
        fetch('/api/auth/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/auth/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!usersResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const usersData = await usersResponse.json();
      const statsData = await statsResponse.json();

      setUsers(usersData.users || []);
      setStats(statsData.stats || {});
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      // Refresh user data
      fetchDashboardData();
    } catch (err) {
      console.error('Error updating user status:', err);
      setError('Failed to update user status');
    }
  };

  const renderOverview = () => (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <button className="primary-btn">
          <i className="fas fa-download"></i>
          Export Report
        </button>
      </div>

      {loading ? (
        <div className="loading-message">Loading dashboard data...</div>
      ) : error ? (
        <div className="error-message">
          {error}
          <button onClick={fetchDashboardData} className="retry-btn">
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Admin Stats */}
          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Total Users</span>
                <div className="admin-stat-icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="admin-stat-value">{stats.totalUsers || 0}</div>
              <div className="admin-stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +{stats.newUsersThisMonth || 0} this month
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Active Users</span>
                <div className="admin-stat-icon">
                  <i className="fas fa-user-check"></i>
                </div>
              </div>
              <div className="admin-stat-value">{stats.activeUsers || 0}</div>
              <div className="admin-stat-change neutral">
                <i className="fas fa-minus"></i>
                No change
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Instructors</span>
                <div className="admin-stat-icon">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
              </div>
              <div className="admin-stat-value">{stats.usersByRole?.instructor || 0}</div>
              <div className="admin-stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +2 this week
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-header">
                <span className="admin-stat-title">Learners</span>
                <div className="admin-stat-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
              </div>
              <div className="admin-stat-value">{stats.usersByRole?.learner || 0}</div>
              <div className="admin-stat-change positive">
                <i className="fas fa-arrow-up"></i>
                +15 this week
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="quick-action-card" onClick={() => setCurrentView('users')}>
              <div className="quick-action-icon">
                <i className="fas fa-users-cog"></i>
              </div>
              <h4>Manage Users</h4>
              <p>View and manage user accounts</p>
            </div>

            <div className="quick-action-card" onClick={() => setCurrentView('courses')}>
              <div className="quick-action-icon">
                <i className="fas fa-book"></i>
              </div>
              <h4>Manage Courses</h4>
              <p>Oversee course content and structure</p>
            </div>

            <div className="quick-action-card" onClick={() => setCurrentView('analytics')}>
              <div className="quick-action-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h4>Analytics</h4>
              <p>View platform usage statistics</p>
            </div>

            <div className="quick-action-card">
              <div className="quick-action-icon">
                <i className="fas fa-cog"></i>
              </div>
              <h4>System Settings</h4>
              <p>Configure platform settings</p>
            </div>
          </div>

          {/* System Health */}
          <div className="system-health">
            <h3>System Health</h3>
            <div className="health-metrics">
              <div className="health-metric">
                <div className="health-icon good">
                  <i className="fas fa-server"></i>
                </div>
                <div className="health-info">
                  <h4>Server Status</h4>
                  <p>Online and running smoothly</p>
                </div>
              </div>

              <div className="health-metric">
                <div className="health-icon good">
                  <i className="fas fa-database"></i>
                </div>
                <div className="health-info">
                  <h4>Database</h4>
                  <p>Connected and responsive</p>
                </div>
              </div>

              <div className="health-metric">
                <div className="health-icon warning">
                  <i className="fas fa-memory"></i>
                </div>
                <div className="health-info">
                  <h4>Memory Usage</h4>
                  <p>75% - Monitor closely</p>
                </div>
              </div>

              <div className="health-metric">
                <div className="health-icon good">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="health-info">
                  <h4>Security</h4>
                  <p>All systems secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-avatar">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="activity-content">
                  <p><strong>New user registered:</strong> john.doe@example.com</p>
                  <span className="activity-time">2 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  <i className="fas fa-book"></i>
                </div>
                <div className="activity-content">
                  <p><strong>Course created:</strong> Advanced React Development</p>
                  <span className="activity-time">15 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="activity-content">
                  <p><strong>Course completed:</strong> JavaScript Fundamentals by user@example.com</p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  <i className="fas fa-user-edit"></i>
                </div>
                <div className="activity-content">
                  <p><strong>User profile updated:</strong> instructor@skillwise.com</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-avatar">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="activity-content">
                  <p><strong>System backup completed</strong> successfully</p>
                  <span className="activity-time">6 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="page-header">
        <h1>User Management</h1>
        <div className="table-actions">
          <select className="filter-select">
            <option value="all">All Users</option>
            <option value="admin">Admins</option>
            <option value="instructor">Instructors</option>
            <option value="learner">Learners</option>
          </select>
          <button className="export-btn">
            <i className="fas fa-download"></i>
            Export
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Loading users...</div>
      ) : error ? (
        <div className="error-message">
          {error}
          <button onClick={fetchDashboardData} className="retry-btn">
            Retry
          </button>
        </div>
      ) : (
        <div className="data-table">
          <div className="table-header">
            <h3>All Users ({users.length})</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.full_name || `${user.first_name} ${user.last_name}`}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status || 'active'}`}>
                      {user.status || 'active'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view-btn" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="action-btn edit-btn" title="Edit User">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="action-btn delete-btn" 
                        title="Suspend User"
                        onClick={() => updateUserStatus(user.id, 'suspended')}
                      >
                        <i className="fas fa-ban"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderCourses = () => (
    <div>
      <div className="page-header">
        <h1>Course Management</h1>
        <button className="primary-btn">
          <i className="fas fa-plus"></i>
          Add Course
        </button>
      </div>
      <div className="no-data">
        Course management features coming soon...
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <button className="primary-btn">
          <i className="fas fa-chart-line"></i>
          Generate Report
        </button>
      </div>
      <div className="no-data">
        Analytics dashboard coming soon...
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return renderUsers();
      case 'courses':
        return renderCourses();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="admin-dashboard">
      <NavBar />
      
      <div className="dashboard-container">
        {/* Admin Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-profile">
            <div className="profile-avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <h3>Admin Portal</h3>
            <p>System Administrator</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{users.length}</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">99%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${currentView === 'overview' ? 'active' : ''}`}
              onClick={() => setCurrentView('overview')}
            >
              <i className="nav-icon fas fa-tachometer-alt"></i>
              Overview
            </button>
            
            <button 
              className={`nav-item ${currentView === 'users' ? 'active' : ''}`}
              onClick={() => setCurrentView('users')}
            >
              <i className="nav-icon fas fa-users"></i>
              Users
            </button>
            
            <button 
              className={`nav-item ${currentView === 'courses' ? 'active' : ''}`}
              onClick={() => setCurrentView('courses')}
            >
              <i className="nav-icon fas fa-book"></i>
              Courses
            </button>
            
            <button 
              className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`}
              onClick={() => setCurrentView('analytics')}
            >
              <i className="nav-icon fas fa-chart-bar"></i>
              Analytics
            </button>
            
            <button className="nav-item">
              <i className="nav-icon fas fa-cog"></i>
              Settings
            </button>
            
            <button className="nav-item">
              <i className="nav-icon fas fa-shield-alt"></i>
              Security
            </button>
            
            <button className="nav-item">
              <i className="nav-icon fas fa-database"></i>
              Backup
            </button>
            
            <button className="nav-item">
              <i className="nav-icon fas fa-bug"></i>
              Logs
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
