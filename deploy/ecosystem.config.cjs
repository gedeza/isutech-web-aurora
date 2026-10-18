// pm2 process definition for the iSuTech website API on Dube TradePort.
// Start once with: pm2 start deploy/ecosystem.config.cjs && pm2 save
// Environment (DATABASE_URL, JWT_SECRET, PORT, ...) is read from backend/.env by dotenv (cwd = backend).
module.exports = {
  apps: [
    {
      name: 'isutech-web-api',
      cwd: '/data/www/isutech-web/backend',
      script: 'dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '400M',
      env: { NODE_ENV: 'production' },
    },
  ],
};
