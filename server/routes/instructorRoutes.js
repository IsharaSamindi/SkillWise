const express = require('express');
const router = express.Router();
const {
  createInstructorProfile,
  getInstructorProfile,
  updateInstructorProfile,
  getAllInstructors,
  deleteInstructorProfile
} = require('../controllers/instructorController');

// POST /api/instructors - Create instructor profile
router.post('/', createInstructorProfile);

// GET /api/instructors - Get all instructors (with filters)
router.get('/', getAllInstructors);

// GET /api/instructors/:user_id - Get instructor profile by user_id
router.get('/:user_id', getInstructorProfile);

// PUT /api/instructors/:user_id - Update instructor profile
router.put('/:user_id', updateInstructorProfile);

// DELETE /api/instructors/:user_id - Delete instructor profile
router.delete('/:user_id', deleteInstructorProfile);

module.exports = router;
