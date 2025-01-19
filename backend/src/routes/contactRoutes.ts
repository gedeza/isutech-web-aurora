import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// POST /api/contact - Submit a contact form
router.post('/', submitContact);

// GET /api/contact - Get all contact submissions (protected route for admin)
router.get('/', protect, authorize('admin'), getContacts);

export default router; 