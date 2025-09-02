const pool = require('./config/db');

class DatabaseHelper {
  // Generic query method with better error handling
  static async query(text, params) {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (err) {
      console.error('Database query error:', err);
      
      // Handle specific PostgreSQL errors
      if (err.code === '23505') { // Unique violation
        throw new Error('Duplicate entry found');
      }
      if (err.code === '23502') { // Not null violation
        throw new Error('Required field is missing');
      }
      if (err.code === '23503') { // Foreign key violation
        throw new Error('Referenced record not found');
      }
      
      throw err;
    } finally {
      client.release();
    }
  }

  // User operations with enhanced validation
  static async createUser(userData) {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      address = null, 
      phoneNumber = null, 
      profilePhoto = null 
    } = userData;
    
    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role) {
      throw new Error('All user fields are required');
    }

    // Check if user already exists
    const existingUser = await this.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const query = `
      INSERT INTO users (email, password, first_name, last_name, role, address, phone_number, profile_photo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, email, first_name, last_name, role, address, phone_number, profile_photo, created_at
    `;
    const result = await this.query(query, [
      email.toLowerCase(), 
      password, 
      firstName, 
      lastName, 
      role, 
      address, 
      phoneNumber, 
      profilePhoto
    ]);
    return result.rows[0];
  }

  static async getUserByEmail(email) {
    if (!email) {
      throw new Error('Email is required');
    }
    
    const query = `
      SELECT id, email, password, 
             CONCAT(first_name, ' ', last_name) as full_name,
             first_name, last_name, role, address, phone_number, profile_photo, created_at 
      FROM users 
      WHERE LOWER(email) = LOWER($1)
    `;
    const result = await this.query(query, [email]);
    return result.rows[0];
  }

  static async getUserById(id) {
    if (!id) {
      throw new Error('User ID is required');
    }
    
    const query = `
      SELECT id, email, 
             CONCAT(first_name, ' ', last_name) as full_name,
             first_name, last_name, role, created_at 
      FROM users 
      WHERE id = $1
    `;
    const result = await this.query(query, [id]);
    return result.rows[0];
  }

  // Course operations
  static async createCourse(courseData) {
    const { title, description, instructorId, price, durationHours, level, category } = courseData;
    const query = `
      INSERT INTO courses (title, description, instructor_id, price, duration_hours, level, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await this.query(query, [title, description, instructorId, price, durationHours, level, category]);
    return result.rows[0];
  }

  static async getCoursesByInstructor(instructorId) {
    const query = `
      SELECT c.*, 
             CONCAT(u.first_name, ' ', u.last_name) as instructor_full_name,
             u.first_name, u.last_name 
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      WHERE c.instructor_id = $1
      ORDER BY c.created_at DESC
    `;
    const result = await this.query(query, [instructorId]);
    return result.rows;
  }

  static async getAllPublishedCourses() {
    const query = `
      SELECT c.*, 
             CONCAT(u.first_name, ' ', u.last_name) as instructor_full_name,
             u.first_name, u.last_name,
             COUNT(e.id) as enrollment_count
      FROM courses c
      JOIN users u ON c.instructor_id = u.id
      LEFT JOIN enrollments e ON c.id = e.course_id
      WHERE c.is_published = true
      GROUP BY c.id, u.first_name, u.last_name
      ORDER BY c.created_at DESC
    `;
    const result = await this.query(query);
    return result.rows;
  }

  // Enrollment operations
  static async enrollUserInCourse(userId, courseId) {
    const query = `
      INSERT INTO enrollments (user_id, course_id)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await this.query(query, [userId, courseId]);
    return result.rows[0];
  }

  static async getUserEnrollments(userId) {
    const query = `
      SELECT e.*, c.title, c.description, c.thumbnail_url,
             CONCAT(u.first_name, ' ', u.last_name) as instructor_full_name,
             u.first_name, u.last_name
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_at DESC
    `;
    const result = await this.query(query, [userId]);
    return result.rows;
  }

  // Get students enrolled in instructor's courses with full names
  static async getInstructorStudents(instructorId) {
    const query = `
      SELECT DISTINCT
        u.id,
        u.email,
        CONCAT(u.first_name, ' ', u.last_name) as full_name,
        u.role,
        e.enrolled_at,
        e.progress,
        c.title as course_title,
        c.id as course_id
      FROM users u
      JOIN enrollments e ON u.id = e.user_id
      JOIN courses c ON e.course_id = c.id
      WHERE c.instructor_id = $1
      ORDER BY e.enrolled_at DESC
    `;
    const result = await this.query(query, [instructorId]);
    return result.rows;
  }

  // Database statistics
  static async getDatabaseStats() {
    const stats = {};
    
    // Count users
    const usersResult = await this.query('SELECT COUNT(*) as count FROM users');
    stats.totalUsers = parseInt(usersResult.rows[0].count);
    
    // Count courses
    const coursesResult = await this.query('SELECT COUNT(*) as count FROM courses');
    stats.totalCourses = parseInt(coursesResult.rows[0].count);
    
    // Count enrollments
    const enrollmentsResult = await this.query('SELECT COUNT(*) as count FROM enrollments');
    stats.totalEnrollments = parseInt(enrollmentsResult.rows[0].count);
    
    return stats;
  }

  // Admin-specific functions
  static async getAllUsers() {
    const query = `
      SELECT 
        id, 
        email, 
        CONCAT(first_name, ' ', last_name) as full_name,
        first_name,
        last_name,
        role, 
        created_at,
        'active' as status
      FROM users 
      ORDER BY created_at DESC
    `;
    const result = await this.query(query);
    return result.rows;
  }

  static async getUserStats() {
    const stats = {};
    
    // Total users by role
    const roleQuery = `
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `;
    const roleResult = await this.query(roleQuery);
    
    stats.usersByRole = {};
    roleResult.rows.forEach(row => {
      stats.usersByRole[row.role] = parseInt(row.count);
    });
    
    // Total counts
    const totalUsersResult = await this.query('SELECT COUNT(*) as count FROM users');
    stats.totalUsers = parseInt(totalUsersResult.rows[0].count);
    
    // New users this month
    const thisMonthQuery = `
      SELECT COUNT(*) as count 
      FROM users 
      WHERE created_at >= date_trunc('month', CURRENT_DATE)
    `;
    const thisMonthResult = await this.query(thisMonthQuery);
    stats.newUsersThisMonth = parseInt(thisMonthResult.rows[0].count);
    
    // Active users (assuming all users are active for now)
    stats.activeUsers = stats.totalUsers;
    
    return stats;
  }

  static async updateUserStatus(userId, status) {
    // Note: For now we'll just return the user since we don't have a status column
    // In a real implementation, you'd add a status column to the users table
    const query = `
      SELECT 
        id, 
        email, 
        CONCAT(first_name, ' ', last_name) as full_name,
        first_name,
        last_name,
        role, 
        created_at
      FROM users 
      WHERE id = $1
    `;
    const result = await this.query(query, [userId]);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }
    
    // Return the user with the requested status
    const user = result.rows[0];
    user.status = status;
    
    return user;
  }
}

module.exports = DatabaseHelper;
