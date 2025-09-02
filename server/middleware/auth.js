const jwt = require('jsonwebtoken');
const DatabaseHelper = require('../db-helper');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Access token required. Please include Authorization header with Bearer token.' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify user still exists in database
    const user = await DatabaseHelper.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'User account no longer exists' 
      });
    }

    // Attach user info to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      tokenIssuedAt: decoded.iat
    };
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: 'Token has expired. Please login again.' 
      });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        success: false,
        error: 'Invalid token format' 
      });
    }
    
    return res.status(403).json({ 
      success: false,
      error: 'Token verification failed' 
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
