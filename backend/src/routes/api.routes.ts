import express from 'express';
import { protect, adminOnly } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';
import * as customerController from '../controllers/customer.controller';
import * as productController from '../controllers/product.controller';
import * as userController from '../controllers/user.controller';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import serviceRoutes from './service.routes';

const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', protect, authController.getMe);
router.put('/auth/profile', protect, authController.updateProfile);

// Customer routes
router.route('/customers')
  .get(protect, adminOnly, customerController.getCustomers)
  .post(protect, adminOnly, customerController.createCustomer);

router.route('/customers/:id')
  .get(protect, adminOnly, customerController.getCustomer)
  .put(protect, adminOnly, customerController.updateCustomer)
  .delete(protect, adminOnly, customerController.deleteCustomer);

router.post('/customers/:id/notes', protect, adminOnly, customerController.addCustomerNote);
router.patch('/customers/:id/status', protect, adminOnly, customerController.updateCustomerStatus);

// Product routes
router.route('/products')
  .get(protect, adminOnly, productController.getProducts)
  .post(protect, adminOnly, productController.createProduct);

router.route('/products/:id')
  .get(protect, adminOnly, productController.getProduct)
  .put(protect, adminOnly, productController.updateProduct)
  .delete(protect, adminOnly, productController.deleteProduct);

router.route('/products/:id/variants')
  .post(protect, adminOnly, productController.addProductVariant);

router.route('/products/:id/variants/:variantId')
  .put(protect, adminOnly, productController.updateProductVariant)
  .delete(protect, adminOnly, productController.deleteProductVariant);

router.patch('/products/:id/status', protect, adminOnly, productController.updateProductStatus);

// User routes
router.route('/users')
  .get(protect, adminOnly, userController.getUsers)
  .post(protect, adminOnly, userController.createUser);

router.route('/users/:id')
  .get(protect, adminOnly, userController.getUser)
  .put(protect, adminOnly, userController.updateUser)
  .delete(protect, adminOnly, userController.deleteUser);

router.patch('/users/:id/status', protect, adminOnly, userController.updateUserStatus);
router.put('/users/:id/role', protect, adminOnly, userController.updateUserRole);

// Register route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);

export default router; 