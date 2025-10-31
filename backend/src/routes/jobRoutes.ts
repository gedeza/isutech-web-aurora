import express from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  submitApplication,
  getJobApplications,
} from '../controllers/jobController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/:id/apply', submitApplication);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/:id/applications', getJobApplications);

export default router; 