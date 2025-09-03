const express = require('express');
const router = express.Router();
const {
  createLearnerProfile,
  getLearnerProfile,
  updateLearnerProfile,
  getAllLearners,
  updateLearnerProgress,
  deleteLearnerProfile
} = require('../controllers/learnerController');

// POST /api/learners - Create learner profile
router.post('/', createLearnerProfile);

// GET /api/learners - Get all learners (with filters)
router.get('/', getAllLearners);

// GET /api/learners/:user_id - Get learner profile by user_id
router.get('/:user_id', getLearnerProfile);

// PUT /api/learners/:user_id - Update learner profile
router.put('/:user_id', updateLearnerProfile);

// PUT /api/learners/:user_id/progress - Update learner progress
router.put('/:user_id/progress', updateLearnerProgress);

// DELETE /api/learners/:user_id - Delete learner profile
router.delete('/:user_id', deleteLearnerProfile);

module.exports = router;
