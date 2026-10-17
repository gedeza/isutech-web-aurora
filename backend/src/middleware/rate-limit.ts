import { Request, Response, NextFunction } from 'express';

/**
 * Minimal in-memory, per-IP fixed-window rate limiter (single pm2 instance, so no shared store needed).
 * Relies on `app.set('trust proxy', 1)` so req.ip is the real client behind nginx.
 */
export const rateLimit = (max: number, windowMs: number) => {
  const hits = new Map<string, { count: number; resetAt: number }>();

  // Drop expired entries so the map cannot grow without bound
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    entry.count += 1;
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.resetAt - now) / 1000).toString());
      const message = 'Too many submissions. Please try again later.';
      res.status(429).json({ error: message, message });
      return;
    }
    next();
  };
};
