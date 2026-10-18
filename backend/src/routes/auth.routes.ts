import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller.prisma';
import { validateRequest } from '../middleware/validate-request';
import { protect } from '../middleware/auth.prisma';
import { rateLimit } from '../middleware/rate-limit';

const router = express.Router();

// There is deliberately no public registration route: admins create users via POST /api/users.

// 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit(10, 15 * 60 * 1000, 'Too many login attempts. Please try again later.');

router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  authController.login
);

router.get('/me', protect, authController.getMe);
router.put('/profile', protect, authController.updateProfile);

router.post(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 12 })
      .withMessage('New password must be at least 12 characters'),
  ],
  validateRequest,
  authController.changePassword
);

export default router;
