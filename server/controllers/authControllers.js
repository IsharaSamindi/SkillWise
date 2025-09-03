const DatabaseHelper = require('../db-helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    // Debug: log the request body and file
    console.log('📝 Request body:', req.body);
    console.log('📁 Request file:', req.file);
    
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      address, 
      phoneNumber 
    } = req.body;
    
    // Check if required fields are present
    if (!req.body || !email || !password || !firstName || !lastName || !role) {
      console.log('❌ Missing required fields:', { email, password, firstName, lastName, role });
      return res.status(400).json({ 
        error: 'All fields are required: email, password, firstName, lastName, role' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Validate role
    const validRoles = ['instructor', 'learner', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Role must be either instructor, learner, or admin' });
    }

    // Validate phone number format if provided (for learners)
    if (phoneNumber && phoneNumber.trim() && role === 'learner') {
      if (!DatabaseHelper.validateSriLankanPhone(phoneNumber.trim())) {
        return res.status(400).json({ 
          error: 'Please provide a valid Sri Lankan phone number (+94XXXXXXXXX or 0XXXXXXXXX)' 
        });
      }
    }

    // Check if user already exists
    const existingUser = await DatabaseHelper.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 12; // Increased for better security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Handle profile photo if uploaded
    let profilePhotoPath = null;
    if (req.file) {
      profilePhotoPath = `/uploads/profiles/${req.file.filename}`;
    }

    // Create user (basic info only)
    const user = await DatabaseHelper.createUser({
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role
    });

    // If user is a learner, create learner profile with additional info
    let learnerProfile = null;
    if (role === 'learner') {
      learnerProfile = await DatabaseHelper.createLearnerProfile({
        userId: user.id,
        address: address ? address.trim() : null,
        phoneNumber: phoneNumber ? phoneNumber.trim() : null,
        profilePhoto: profilePhotoPath,
        learningGoals: req.body.learningGoals ? req.body.learningGoals.trim() : null
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        iat: Math.floor(Date.now() / 1000)
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: `${user.first_name} ${user.last_name}`,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        createdAt: user.created_at,
        ...(learnerProfile && { learnerProfile })
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error. Please try again later.' 
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Find user by email (case insensitive)
    const user = await DatabaseHelper.getUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        iat: Math.floor(Date.now() / 1000)
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error. Please try again later.' 
    });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await DatabaseHelper.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

// Get instructor's students
exports.getInstructorStudents = async (req, res) => {
  try {
    // Check if user is an instructor
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ error: 'Access denied. Only instructors can view student data.' });
    }

    const students = await DatabaseHelper.getInstructorStudents(req.user.id);
    
    res.json({
      success: true,
      students: students,
      count: students.length
    });
  } catch (err) {
    console.error('Get instructor students error:', err);
    res.status(500).json({ error: 'Failed to get student data' });
  }
};

// Admin-specific endpoints
exports.getAllUsers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    const users = await DatabaseHelper.getAllUsers();
    
    res.json({
      success: true,
      users: users,
      count: users.length
    });
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Failed to get user data' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    const stats = await DatabaseHelper.getUserStats();
    
    res.json({
      success: true,
      stats: stats
    });
  } catch (err) {
    console.error('Get user stats error:', err);
    res.status(500).json({ error: 'Failed to get user statistics' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    const { userId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be active, inactive, or suspended.' });
    }

    const updatedUser = await DatabaseHelper.updateUserStatus(userId, status);
    
    res.json({
      success: true,
      message: 'User status updated successfully',
      user: updatedUser
    });
  } catch (err) {
    console.error('Update user status error:', err);
    res.status(500).json({ error: 'Failed to update user status' });
  }
};