import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import * as serviceController from '../controllers/service.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth, adminAuth } from '../middleware/auth.middleware';
import { protect, adminOnly } from '../middleware/auth';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/services');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);

// Protected routes (admin only)
router.post('/', protect, adminOnly, upload.single('image'), serviceController.createService);
router.put('/:id', protect, adminOnly, serviceController.updateService);
router.delete('/:id', protect, adminOnly, serviceController.deleteService);
router.patch('/:id/status', protect, adminOnly, serviceController.updateServiceStatus);

// Get service categories
router.get('/categories', serviceController.getServiceCategories);

// Get service by slug
router.get('/:slug', serviceController.getServiceBySlug);

export default router; 