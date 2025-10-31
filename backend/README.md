# ISU Technologies Backend

TypeScript backend with MongoDB for the ISU Technologies website, providing admin dashboard, CRM, and content management capabilities.

## 🏗️ Architecture

- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT + bcrypt
- **File Upload:** Multer
- **Email:** Nodemailer

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── middleware/       # Auth, validation, etc.
│   ├── config/           # Database configuration
│   ├── scripts/          # Utility scripts (seed admin)
│   ├── utils/            # Helper functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── uploads/              # File storage (gitignored)
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB installed and running locally OR MongoDB Atlas account
- Git

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or from project root:
   npm run backend:install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A strong random secret
   - `PORT` - Backend port (default: 4000)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` - For seeding admin user

3. **Ensure MongoDB is running:**
   ```bash
   # If using local MongoDB:
   mongod

   # Or use MongoDB Atlas cloud database
   ```

4. **Seed admin user (first time only):**
   ```bash
   npm run seed:admin
   # or from project root:
   npm run backend:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   # or from project root:
   npm run backend:dev
   ```

   Server will start at `http://localhost:4000`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/refresh` - Refresh JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Contacts
- `GET /api/contact` - Get all contacts (admin only)
- `GET /api/contact/:id` - Get single contact (admin only)
- `POST /api/contact` - Submit contact form (public)
- `PUT /api/contact/:id` - Update contact status (admin only)

### Careers
- `GET /api/careers/jobs` - Get all job listings
- `GET /api/careers/jobs/:id` - Get single job
- `POST /api/careers/jobs` - Create job (admin only)
- `PUT /api/careers/jobs/:id` - Update job (admin only)
- `DELETE /api/careers/jobs/:id` - Delete job (admin only)
- `POST /api/careers/applications` - Submit job application (public)
- `GET /api/careers/applications` - Get all applications (admin only)

### CRM (Customer Relationship Management)
- `GET /api/customers` - Get all customers (admin only)
- `GET /api/customers/:id` - Get single customer (admin only)
- `POST /api/customers` - Create customer (admin only)
- `PUT /api/customers/:id` - Update customer (admin only)
- `DELETE /api/customers/:id` - Delete customer (admin only)

### Users (Admin Management)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Documentation
- `GET /api/documentation` - Get all documentation
- `GET /api/documentation/:id` - Get single doc
- `POST /api/documentation` - Create doc (admin only)
- `PUT /api/documentation/:id` - Update doc (admin only)
- `DELETE /api/documentation/:id` - Delete doc (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**To access protected routes:**

1. Login to get a token:
   ```bash
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@isutech.co.za","password":"your-password"}'
   ```

2. Use the token in subsequent requests:
   ```bash
   curl -X GET http://localhost:4000/api/products \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 📦 Build & Deploy

### Build for production:
```bash
npm run build
# Creates dist/ folder with compiled JavaScript
```

### Start production server:
```bash
npm start
# Runs the compiled code from dist/
```

### Deploy to VPS:
```bash
# 1. Build the project
npm run build

# 2. Copy files to server
scp -r dist/ package.json .env user@your-server:/path/to/backend

# 3. On server, install dependencies and start with PM2
ssh user@your-server
cd /path/to/backend
npm install --production
pm2 start dist/server.js --name isutech-backend
pm2 save
```

## 🗄️ Database Models

- **User** - Admin users with authentication
- **Product** - Product catalog with images
- **Service** - Service offerings
- **Contact** - Contact form submissions
- **Job** - Job listings
- **JobApplication** - Job applications
- **Customer** - CRM customer records
- **Documentation** - Technical documentation

## 🧪 Testing

```bash
npm test
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: MongoServerError: Authentication failed
```
**Solution:** Check your `MONGODB_URI` in `.env`. Ensure MongoDB is running.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Solution:** Change `PORT` in `.env` or kill the process using port 4000:
```bash
lsof -ti:4000 | xargs kill -9
```

### Admin User Not Created
```bash
# Re-run the seed script:
npm run seed:admin
```

## 📚 Related Documentation

- [Main Project README](../README.md)
- [Frontend Documentation](../src/README.md)
- [API Integration Guide](../Docs/API_INTEGRATION.md)

## 🔗 Environment Variables

See `.env.example` for all available environment variables and their descriptions.

## 🤝 Contributing

This backend is part of the ISU Technologies website project. Follow the main project's contributing guidelines.

---

**Backend Version:** 1.0.0
**Last Updated:** October 31, 2025
