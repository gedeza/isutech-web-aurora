import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import * as serviceController from '../controllers/service.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth, adminAuth } from '../middleware/auth.middleware';

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

// Create service
router.post(
  '/',
  auth,
  adminAuth,
  upload.single('image'),
  [
    body('name').notEmpty().withMessage('Service name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('shortDescription').notEmpty().withMessage('Short description is required'),
    body('features').isArray().withMessage('Features must be an array'),
    body('benefits').isArray().withMessage('Benefits must be an array'),
    body('process').isArray().withMessage('Process must be an array'),
    body('process.*.title').notEmpty().withMessage('Process step title is required'),
    body('process.*.description').notEmpty().withMessage('Process step description is required'),
    body('technologies').isArray().withMessage('Technologies must be an array'),
    body('pricingTiers').isArray().withMessage('Pricing tiers must be an array'),
    body('pricingTiers.*.name').notEmpty().withMessage('Pricing tier name is required'),
    body('pricingTiers.*.price').isNumeric().withMessage('Price must be a number'),
    body('pricingTiers.*.features').isArray().withMessage('Pricing tier features must be an array'),
    body('category').notEmpty().withMessage('Category is required'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  ],
  validateRequest,
  serviceController.createService
);

// Get all services
router.get('/', serviceController.getAllServices);

// Get service categories
router.get('/categories', serviceController.getServiceCategories);

// Get service by slug
router.get('/:slug', serviceController.getServiceBySlug);

// Update service
router.patch(
  '/:id',
  auth,
  adminAuth,
  upload.single('image'),
  [
    body('name').optional().notEmpty().withMessage('Service name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('shortDescription').optional().notEmpty().withMessage('Short description cannot be empty'),
    body('features').optional().isArray().withMessage('Features must be an array'),
    body('benefits').optional().isArray().withMessage('Benefits must be an array'),
    body('process').optional().isArray().withMessage('Process must be an array'),
    body('process.*.title').optional().notEmpty().withMessage('Process step title cannot be empty'),
    body('process.*.description').optional().notEmpty().withMessage('Process step description cannot be empty'),
    body('technologies').optional().isArray().withMessage('Technologies must be an array'),
    body('pricingTiers').optional().isArray().withMessage('Pricing tiers must be an array'),
    body('pricingTiers.*.name').optional().notEmpty().withMessage('Pricing tier name cannot be empty'),
    body('pricingTiers.*.price').optional().isNumeric().withMessage('Price must be a number'),
    body('pricingTiers.*.features').optional().isArray().withMessage('Pricing tier features must be an array'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  ],
  validateRequest,
  serviceController.updateService
);

// Delete service
router.delete('/:id', auth, adminAuth, serviceController.deleteService);

export default router; 