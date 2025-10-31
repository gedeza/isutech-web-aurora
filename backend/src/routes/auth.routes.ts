import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate-request';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  validateRequest,
  authController.register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  authController.login
);

// Get current user
router.get('/me', authController.getCurrentUser);

// Change password
router.post(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
  ],
  validateRequest,
  authController.changePassword
);

export default router; 