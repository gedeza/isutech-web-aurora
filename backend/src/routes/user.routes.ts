import express from 'express';
import { body } from 'express-validator';
import { updateUserRole } from '../controllers/user.controller';
import { protect } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

const router = express.Router();

// Update user role (admin only)
router.patch('/role',
  protect,
  isAdmin,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').isIn(['user', 'admin']).withMessage('Invalid role')
  ],
  updateUserRole
);

export default router; 