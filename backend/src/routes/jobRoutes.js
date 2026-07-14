const express = require('express');
const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyForJob,
  getMyApplications,
  getMyJobs
} = require('../controllers/jobs/jobController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes - these must come BEFORE the /:id route
router.get('/', getJobs);

// Protected routes
router.use(protect);

// These routes must come BEFORE /:id
router.get('/my-jobs', getMyJobs);
router.get('/applications/me', getMyApplications);
router.post('/', createJob);
router.post('/:id/apply', applyForJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

// This must come LAST - catches /:id
router.get('/:id', getJob);

module.exports = router;
