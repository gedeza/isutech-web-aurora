import dotenv from 'dotenv';

dotenv.config();

// Fail fast: a missing or weak signing secret must stop the API from starting, not silently
// fall back to a guessable default that would let anyone mint admin tokens.
const secret = process.env.JWT_SECRET;
if (!secret || secret.length < 32) {
  console.error('FATAL: JWT_SECRET must be set to a random string of at least 32 characters.');
  process.exit(1);
}

export const JWT_SECRET: string = secret;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';

const isProduction = process.env.NODE_ENV === 'production';

// Comma-separated list of allowed browser origins. Defaults to the public site; localhost is
// only allowed outside production.
export const CORS_ORIGINS: string[] = (
  process.env.CORS_ORIGINS || 'https://isutech.co.za,https://www.isutech.co.za'
)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)
  .concat(isProduction ? [] : ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:4173']);
