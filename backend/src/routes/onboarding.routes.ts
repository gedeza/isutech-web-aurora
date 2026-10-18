import express from 'express';
import { protect, adminOnly } from '../middleware/auth.prisma';
import * as onboardingController from '../controllers/onboarding.controller.prisma';
import { rateLimit } from '../middleware/rate-limit';

const router = express.Router();

// Public route - Submit onboarding form
router.post('/onboarding', rateLimit(5, 60 * 60 * 1000), onboardingController.submitOnboarding);

// Admin routes - Manage leads
router.get('/leads', protect, adminOnly, onboardingController.getAllLeads);
router.get('/leads/:leadId', protect, adminOnly, onboardingController.getLeadById);
router.put('/leads/:leadId', protect, adminOnly, onboardingController.updateLead);

export default router;
