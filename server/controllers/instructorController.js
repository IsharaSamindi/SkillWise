const pool = require('../config/db');

// Create instructor profile
const createInstructorProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      user_id, 
      experience_years, 
      bio, 
      profile_photo,
      phone_number,
      address,
      first_name,
      last_name
    } = req.body;
    
    // Validate required fields
    if (!user_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    // Check if user exists and is an instructor
    const userCheck = await client.query(
      'SELECT id, role FROM users WHERE id = $1',
      [user_id]
    );
    
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    if (userCheck.rows[0].role !== 'instructor') {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not registered as an instructor' 
      });
    }
    
    // Check if instructor profile already exists
    const existingProfile = await client.query(
      'SELECT instructor_id FROM instructors WHERE user_id = $1',
      [user_id]
    );
    
    if (existingProfile.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Instructor profile already exists' 
      });
    }
    
    // Create instructor profile
    const result = await client.query(
      `INSERT INTO instructors (
        user_id, experience_years, bio, profile_photo,
        phone_number, address, first_name, last_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING instructor_id, user_id, first_name, last_name`,
      [user_id, experience_years, bio, profile_photo, 
       phone_number, address, first_name, last_name]
    );
    
    res.status(201).json({
      success: true,
      message: 'Instructor profile created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creating instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create instructor profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Get instructor profile
const getInstructorProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    
    // Get instructor profile with user details
    const result = await client.query(
      `SELECT 
        instructor_id,
        user_id,
        experience_years,
        bio,
        profile_photo,
        phone_number,
        address,
        first_name,
        last_name
      FROM instructors
      WHERE user_id = $1`,
      [user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Instructor profile not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error fetching instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructor profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Update instructor profile
const updateInstructorProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    const updates = req.body;
    
    // Remove user_id from updates if present (shouldn't be updated)
    delete updates.user_id;
    delete updates.instructor_id;
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    // Build dynamic update query
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [user_id, ...Object.values(updates)];
    
    const result = await client.query(
      `UPDATE instructors 
       SET ${setClause}
       WHERE user_id = $1 
       RETURNING instructor_id, user_id, first_name, last_name`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Instructor profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Instructor profile updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update instructor profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Get all instructors
const getAllInstructors = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      limit = 10, 
      offset = 0 
    } = req.query;
    
    let query = `
      SELECT 
        instructor_id,
        user_id,
        first_name,
        last_name,
        experience_years,
        bio,
        profile_photo,
        phone_number,
        address
      FROM instructors
      WHERE 1=1
    `;
    
    const queryParams = [];
    let paramCount = 0;
    
    // Add ordering and pagination
    query += ` ORDER BY instructor_id`;
    
    paramCount++;
    query += ` LIMIT $${paramCount}`;
    queryParams.push(limit);
    
    paramCount++;
    query += ` OFFSET $${paramCount}`;
    queryParams.push(offset);
    
    const result = await client.query(query, queryParams);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: result.rows.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch instructors',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Delete instructor profile
const deleteInstructorProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    
    const result = await client.query(
      'DELETE FROM instructors WHERE user_id = $1 RETURNING instructor_id',
      [user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Instructor profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Instructor profile deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting instructor profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete instructor profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createInstructorProfile,
  getInstructorProfile,
  updateInstructorProfile,
  getAllInstructors,
  deleteInstructorProfile
};
