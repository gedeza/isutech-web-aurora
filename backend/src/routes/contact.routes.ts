import express from 'express';
import { body } from 'express-validator';
import * as contactController from '../controllers/contact.controller';
import { validateRequest } from '../middleware/validate-request';
import { protect, adminOnly } from '../middleware/auth';

const router = express.Router();

// Submit contact form (public)
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  validateRequest,
  contactController.submitContact
);

// Get all contacts (admin only)
router.get('/', protect, adminOnly, contactController.getAllContacts);

// Get contact by ID (admin only)
router.get('/:id', protect, adminOnly, contactController.getContactById);

// Update contact status (admin only)
router.patch(
  '/:id/status',
  protect,
  adminOnly,
  [
    body('status')
      .isIn(['new', 'read', 'replied'])
      .withMessage('Invalid status'),
  ],
  validateRequest,
  contactController.updateContactStatus
);

// Delete contact (admin only)
router.delete('/:id', protect, adminOnly, contactController.deleteContact);

export default router; 