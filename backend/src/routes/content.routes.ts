import express from 'express';
import * as contentController from '../controllers/content.controller';
import { protect, adminOnly } from '../middleware/auth.prisma';

const router = express.Router();

// Public routes (used by frontend pages)
router.get('/', contentController.getAllContent);
router.get('/:key', contentController.getContentByKey);

// Admin only routes (used by admin dashboard)
router.post('/', protect, adminOnly, contentController.upsertContent);
router.delete('/:key', protect, adminOnly, contentController.deleteContent);

export default router;
