import express from 'express';
import { protect, adminOnly } from '../middleware/auth.prisma';
import * as onboardingController from '../controllers/onboarding.controller.prisma';

const router = express.Router();

// Public route - Submit onboarding form
router.post('/onboarding', onboardingController.submitOnboarding);

// Admin routes - Manage leads
router.get('/leads', protect, adminOnly, onboardingController.getAllLeads);
router.get('/leads/:leadId', protect, adminOnly, onboardingController.getLeadById);
router.put('/leads/:leadId', protect, adminOnly, onboardingController.updateLead);

export default router;
