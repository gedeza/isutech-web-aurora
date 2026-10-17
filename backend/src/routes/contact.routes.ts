import express from 'express';
import { protect, adminOnly } from '../middleware/auth.prisma';
import { rateLimit } from '../middleware/rate-limit';
import * as contactController from '../controllers/contact.controller.prisma';

const router = express.Router();

// Public: 5 submissions per hour per IP
router.post('/', rateLimit(5, 60 * 60 * 1000), contactController.submitContact);

// Admin: manage stored submissions
router.get('/', protect, adminOnly, contactController.getAllContacts);
router.patch('/:id/status', protect, adminOnly, contactController.updateContactStatus);
router.delete('/:id', protect, adminOnly, contactController.deleteContact);

export default router;
