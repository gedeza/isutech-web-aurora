import express from 'express';
import {
  createDocumentation,
  getAllDocumentation,
  getDocumentation,
  updateDocumentation,
  deleteDocumentation,
} from '../controllers/documentationController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllDocumentation);
router.get('/:slug', getDocumentation);

// Protected admin routes
router.use(protect);
router.use(authorize('admin'));

router.post('/', createDocumentation);
router.put('/:id', updateDocumentation);
router.delete('/:id', deleteDocumentation);

export default router; 