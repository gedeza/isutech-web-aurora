import { CORS_ORIGINS } from './config/env'; // must come first: validates required secrets
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRoutes from './routes/api.routes';
import connectDB from './config/db';

const app = express();

// Behind nginx: trust the first proxy so req.ip (used for rate limiting) is the real client address
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header = same-origin, curl or server-to-server; browsers always send one cross-origin
      if (!origin || CORS_ORIGINS.includes(origin)) return callback(null, true);
      callback(null, false);
    },
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Connect to PostgreSQL
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    // Don't exit the process, let the connection retry logic handle it
  }
})();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  // Client errors (bad JSON, payload too large) keep their status and message; server errors never leak internals
  const status = err.status >= 400 && err.status < 500 ? err.status : 500;
  res.status(status).json({ message: status < 500 ? err.message : 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 