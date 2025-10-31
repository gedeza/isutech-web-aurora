import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

export default router; 