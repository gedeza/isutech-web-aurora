import express from 'express';
// import { body } from 'express-validator';
// import { protect } from '../middleware/auth.prisma';
// import { isAdmin } from '../middleware/admin';

const router = express.Router();

// TODO: Update user role endpoint - needs Prisma controller implementation
// User management is currently handled through api.routes.ts /users endpoints

// router.patch('/role',
//   protect,
//   isAdmin,
//   [
//     body('email').isEmail().withMessage('Valid email is required'),
//     body('role').isIn(['USER', 'ADMIN']).withMessage('Invalid role')
//   ],
//   updateUserRole
// );

export default router; 