import express from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import * as careerController from '../controllers/career.controller';
import { validateRequest } from '../middleware/validate-request';
import { auth, adminAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .pdf, .doc and .docx format allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Job Routes
router.post(
  '/jobs',
  auth,
  adminAuth,
  [
    body('title').notEmpty().withMessage('Job title is required'),
    body('description').notEmpty().withMessage('Job description is required'),
    body('requirements').isArray().withMessage('Requirements must be an array'),
    body('location').notEmpty().withMessage('Job location is required'),
    body('type').isIn(['full-time', 'part-time', 'contract']).withMessage('Invalid job type'),
  ],
  validateRequest,
  careerController.createJob
);

router.get('/jobs', careerController.getAllJobs);
router.get('/jobs/:id', careerController.getJobById);

router.patch(
  '/jobs/:id',
  auth,
  adminAuth,
  [
    body('status').optional().isIn(['open', 'closed']).withMessage('Invalid status'),
  ],
  validateRequest,
  careerController.updateJob
);

router.delete('/jobs/:id', auth, adminAuth, careerController.deleteJob);

// Application Routes
router.post(
  '/jobs/:jobId/apply',
  upload.single('resume'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('coverLetter').notEmpty().withMessage('Cover letter is required'),
  ],
  validateRequest,
  careerController.submitApplication
);

router.get('/applications', auth, adminAuth, careerController.getAllApplications);
router.get('/applications/:id', auth, adminAuth, careerController.getApplicationById);

router.patch(
  '/applications/:id/status',
  auth,
  adminAuth,
  [
    body('status')
      .isIn(['pending', 'reviewed', 'shortlisted', 'rejected'])
      .withMessage('Invalid status'),
  ],
  validateRequest,
  careerController.updateApplicationStatus
);

export default router; 