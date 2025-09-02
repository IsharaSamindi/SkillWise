const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/signup', upload.single('profilePhoto'), authController.signup);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.get('/students', authenticateToken, authController.getInstructorStudents);

// Admin routes
router.get('/admin/users', authenticateToken, authController.getAllUsers);
router.get('/admin/stats', authenticateToken, authController.getUserStats);
router.put('/admin/users/:userId/status', authenticateToken, authController.updateUserStatus);

module.exports = router;