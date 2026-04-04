import { Response, NextFunction } from 'express';
import type { AuthRequest } from './auth.prisma';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
}; 