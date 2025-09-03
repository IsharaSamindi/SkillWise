require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection on startup
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('🔄 Testing database connection...');
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
};

// Test connection on startup
testDatabaseConnection();

const authRoutes = require('./routes/authRoutes');
// const instructorRoutes = require('./routes/instructorRoutes-test');
const learnerRoutes = require('./routes/learnerRoutes');

app.use('/api/auth', authRoutes);
// app.use('/api/instructors', instructorRoutes);
app.use('/api/learners', learnerRoutes);

// Simple instructors route for testing
app.get('/api/instructors', async (req, res) => {
  try {
    const pool = require('./config/db');
    const result = await pool.query(`
      SELECT 
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
      ORDER BY instructor_id
      LIMIT 50
    `);
    
    res.json({
      success: true,
      data: result.rows,
      message: `Found ${result.rows.length} instructors`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.json({ 
      status: 'healthy', 
      database: 'connected',
      timestamp: result.rows[0].now 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'unhealthy', 
      database: 'disconnected',
      error: err.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/api/health`);
});