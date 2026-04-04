import express from 'express';
import * as uploadController from '../controllers/upload.controller';
import { protect, adminOnly } from '../middleware/auth.prisma';

const router = express.Router();

// Only Admins should be able to upload images
router.post('/', protect, adminOnly, uploadController.uploadMiddleware, uploadController.uploadImage);

export default router;
