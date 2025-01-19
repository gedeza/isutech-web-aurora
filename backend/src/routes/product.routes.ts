import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import * as productController from '../controllers/product.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products');
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

// Create product
router.post(
  '/',
  auth,
  adminAuth,
  upload.array('images', 5), // Allow up to 5 images
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('shortDescription').notEmpty().withMessage('Short description is required'),
    body('features').isArray().withMessage('Features must be an array'),
    body('benefits').isArray().withMessage('Benefits must be an array'),
    body('pricing.type').isIn(['one-time', 'subscription']).withMessage('Invalid pricing type'),
    body('pricing.amount').isNumeric().withMessage('Price amount must be a number'),
    body('pricing.currency').optional().isString().withMessage('Currency must be a string'),
    body('pricing.interval')
      .optional()
      .isIn(['monthly', 'yearly'])
      .withMessage('Invalid pricing interval'),
    body('category').notEmpty().withMessage('Category is required'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  ],
  validateRequest,
  productController.createProduct
);

// Get all products
router.get('/', productController.getAllProducts);

// Get product categories
router.get('/categories', productController.getProductCategories);

// Get product by slug
router.get('/:slug', productController.getProductBySlug);

// Update product
router.patch(
  '/:id',
  auth,
  adminAuth,
  upload.array('images', 5),
  [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('shortDescription').optional().notEmpty().withMessage('Short description cannot be empty'),
    body('features').optional().isArray().withMessage('Features must be an array'),
    body('benefits').optional().isArray().withMessage('Benefits must be an array'),
    body('pricing.type').optional().isIn(['one-time', 'subscription']).withMessage('Invalid pricing type'),
    body('pricing.amount').optional().isNumeric().withMessage('Price amount must be a number'),
    body('pricing.currency').optional().isString().withMessage('Currency must be a string'),
    body('pricing.interval')
      .optional()
      .isIn(['monthly', 'yearly'])
      .withMessage('Invalid pricing interval'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  ],
  validateRequest,
  productController.updateProduct
);

// Delete product
router.delete('/:id', auth, adminAuth, productController.deleteProduct);

export default router; 