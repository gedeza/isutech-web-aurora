import express from 'express';
import { protect, adminOnly } from '../middleware/auth.prisma';
import * as authController from '../controllers/auth.controller.prisma';
// import * as productController from '../controllers/product.controller.prisma'; // Handled by product.routes.ts
import * as userController from '../controllers/user.controller.prisma';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import serviceRoutes from './service.routes';
import onboardingRoutes from './onboarding.routes';

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', protect, authController.getMe);
router.put('/auth/profile', protect, authController.updateProfile);

// Customer routes - TODO: Convert to Prisma
// router.route('/customers')
//   .get(protect, adminOnly, customerController.getCustomers)
//   .post(protect, adminOnly, customerController.createCustomer);
// router.route('/customers/:id')
//   .get(protect, adminOnly, customerController.getCustomer)
//   .put(protect, adminOnly, customerController.updateCustomer)
//   .delete(protect, adminOnly, customerController.deleteCustomer);
// router.post('/customers/:id/notes', protect, adminOnly, customerController.addCustomerNote);
// router.patch('/customers/:id/status', protect, adminOnly, customerController.updateCustomerStatus);

// NOTE: Product routes are handled by product.routes.ts module (mounted below)
// Duplicate routes commented out to avoid conflicts
// router.route('/products')
//   .get(protect, adminOnly, productController.getAllProducts)
//   .post(protect, adminOnly, productController.createProduct);
// router.route('/products/:id')
//   .get(protect, adminOnly, productController.getProductById)
//   .put(protect, adminOnly, productController.updateProduct)
//   .delete(protect, adminOnly, productController.deleteProduct);
// router.patch('/products/:id/status', protect, adminOnly, productController.updateProductStatus);

// User routes
router.route('/users')
  .get(protect, adminOnly, userController.getAllUsers)
  .post(protect, adminOnly, userController.createUser);

router.route('/users/:id')
  .get(protect, adminOnly, userController.getUserById)
  .put(protect, adminOnly, userController.updateUser)
  .delete(protect, adminOnly, userController.deleteUser);

router.patch('/users/:id/status', protect, adminOnly, userController.updateUserStatus);

// Register route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);
router.use('/autoslip', onboardingRoutes);

export default router; 