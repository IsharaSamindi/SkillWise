const pool = require('../config/db');

// Create learner profile
const createLearnerProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      user_id, 
      address, 
      phone_number, 
      learning_goals, 
      interests,
      skill_level 
    } = req.body;
    
    // Validate required fields
    if (!user_id) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    // Check if user exists and is a learner
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
    
    if (userCheck.rows[0].role !== 'learner') {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not registered as a learner' 
      });
    }
    
    // Check if learner profile already exists
    const existingProfile = await client.query(
      'SELECT learner_id FROM learners WHERE user_id = $1',
      [user_id]
    );
    
    if (existingProfile.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Learner profile already exists' 
      });
    }
    
    // Create learner profile
    const result = await client.query(
      `INSERT INTO learners (
        user_id, address, phone_number, learning_goals, 
        interests, skill_level
      ) VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING learner_id, user_id, skill_level, created_at`,
      [user_id, address, phone_number, learning_goals, interests, skill_level || 'Beginner']
    );
    
    res.status(201).json({
      success: true,
      message: 'Learner profile created successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error creating learner profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create learner profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Get learner profile
const getLearnerProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    
    // Get learner profile with user details
    const result = await client.query(
      `SELECT 
        l.learner_id,
        l.user_id,
        u.email,
        u.first_name,
        u.last_name,
        l.address,
        l.phone_number,
        l.profile_photo,
        l.learning_goals,
        l.interests,
        l.skill_level,
        l.completed_courses,
        l.certificates_earned,
        l.created_at,
        l.updated_at
      FROM learners l
      JOIN users u ON l.user_id = u.id
      WHERE l.user_id = $1`,
      [user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Learner profile not found'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error fetching learner profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch learner profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Update learner profile
const updateLearnerProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    const updates = req.body;
    
    // Remove user_id from updates if present (shouldn't be updated)
    delete updates.user_id;
    delete updates.learner_id;
    
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
      `UPDATE learners 
       SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 
       RETURNING learner_id, user_id, updated_at`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Learner profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Learner profile updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating learner profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update learner profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Get all learners (for admin/instructor view)
const getAllLearners = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      skill_level, 
      interests,
      limit = 10, 
      offset = 0 
    } = req.query;
    
    let query = `
      SELECT 
        l.learner_id,
        l.user_id,
        u.first_name,
        u.last_name,
        u.email,
        l.interests,
        l.skill_level,
        l.completed_courses,
        l.certificates_earned,
        l.profile_photo,
        l.created_at
      FROM learners l
      JOIN users u ON l.user_id = u.id
      WHERE 1=1
    `;
    
    const queryParams = [];
    let paramCount = 0;
    
    // Add filters
    if (skill_level) {
      paramCount++;
      query += ` AND l.skill_level = $${paramCount}`;
      queryParams.push(skill_level);
    }
    
    if (interests) {
      paramCount++;
      query += ` AND l.interests ILIKE $${paramCount}`;
      queryParams.push(`%${interests}%`);
    }
    
    // Add ordering and pagination
    query += ` ORDER BY l.created_at DESC`;
    
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
    console.error('Error fetching learners:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch learners',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Update learner progress
const updateLearnerProgress = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    const { completed_courses, certificates_earned } = req.body;
    
    // Validate input
    if (completed_courses !== undefined && completed_courses < 0) {
      return res.status(400).json({
        success: false,
        message: 'Completed courses cannot be negative'
      });
    }
    
    if (certificates_earned !== undefined && certificates_earned < 0) {
      return res.status(400).json({
        success: false,
        message: 'Certificates earned cannot be negative'
      });
    }
    
    const updates = {};
    if (completed_courses !== undefined) updates.completed_courses = completed_courses;
    if (certificates_earned !== undefined) updates.certificates_earned = certificates_earned;
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No progress fields to update'
      });
    }
    
    // Build dynamic update query
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [user_id, ...Object.values(updates)];
    
    const result = await client.query(
      `UPDATE learners 
       SET ${setClause}, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 
       RETURNING learner_id, user_id, completed_courses, certificates_earned, updated_at`,
      values
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Learner profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Learner progress updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error updating learner progress:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update learner progress',
      error: error.message
    });
  } finally {
    client.release();
  }
};

// Delete learner profile
const deleteLearnerProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { user_id } = req.params;
    
    const result = await client.query(
      'DELETE FROM learners WHERE user_id = $1 RETURNING learner_id',
      [user_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Learner profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Learner profile deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting learner profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete learner profile',
      error: error.message
    });
  } finally {
    client.release();
  }
};

module.exports = {
  createLearnerProfile,
  getLearnerProfile,
  updateLearnerProfile,
  getAllLearners,
  updateLearnerProgress,
  deleteLearnerProfile
};
