import express from 'express';
import { body, query } from 'express-validator';
import * as documentationController from '../controllers/documentation.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Create documentation
router.post(
  '/',
  auth,
  adminAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('summary').notEmpty().withMessage('Summary is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('version').notEmpty().withMessage('Version is required'),
    body('order').optional().isNumeric().withMessage('Order must be a number'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
    body('metadata.tags').optional().isArray().withMessage('Tags must be an array'),
    body('relatedDocs').optional().isArray().withMessage('Related docs must be an array'),
  ],
  validateRequest,
  documentationController.createDoc
);

// Get all documentation
router.get(
  '/',
  [
    query('category').optional().isString(),
    query('subcategory').optional().isString(),
    query('status').optional().isIn(['draft', 'published']),
    query('version').optional().isString(),
  ],
  validateRequest,
  documentationController.getAllDocs
);

// Get documentation categories
router.get('/categories', documentationController.getCategories);

// Search documentation
router.get(
  '/search',
  [
    query('query').notEmpty().withMessage('Search query is required'),
  ],
  validateRequest,
  documentationController.searchDocs
);

// Get documentation by slug
router.get('/:slug', documentationController.getDocBySlug);

// Update documentation
router.patch(
  '/:id',
  auth,
  adminAuth,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('summary').optional().notEmpty().withMessage('Summary cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
    body('subcategory').optional(),
    body('version').optional().notEmpty().withMessage('Version cannot be empty'),
    body('order').optional().isNumeric().withMessage('Order must be a number'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
    body('metadata.tags').optional().isArray().withMessage('Tags must be an array'),
    body('relatedDocs').optional().isArray().withMessage('Related docs must be an array'),
  ],
  validateRequest,
  documentationController.updateDoc
);

// Delete documentation
router.delete('/:id', auth, adminAuth, documentationController.deleteDoc);

export default router; 