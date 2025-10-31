# MongoDB to PostgreSQL/Prisma Conversion Guide

## ✅ Conversion Status

**Date:** October 31, 2025
**Status:** Core infrastructure complete
**Database:** PostgreSQL with Prisma ORM

---

## 🎯 What's Been Converted

### ✅ Completed
- [x] Database schema (Prisma schema created)
- [x] Database connection (`src/lib/prisma.ts` + `src/config/db.ts`)
- [x] Package dependencies (Mongoose → Prisma)
- [x] Password utilities (`src/utils/password.ts`)
- [x] Admin seed script (`src/scripts/seed-admin.ts`)
- [x] Auth controller (EXAMPLE: `src/controllers/auth.controller.prisma.ts`)
- [x] Environment configuration (`.env.example`)

### ⏳ Pending Conversion
- [ ] Product controller
- [ ] Service controller
- [ ] Contact controller
- [ ] Customer controller (CRM)
- [ ] Job & Application controllers
- [ ] Documentation controller
- [ ] User controller
- [ ] Authentication middleware

---

## 📚 Conversion Patterns

### Pattern 1: Replace Mongoose Imports with Prisma

**Before (Mongoose):**
```typescript
import mongoose from 'mongoose';
import User, { IUser } from '../models/user.model';
```

**After (Prisma):**
```typescript
import { prisma } from '../lib/prisma';
import { User, Prisma } from '@prisma/client';
```

### Pattern 2: Convert Find Operations

**Before (Mongoose):**
```typescript
// Find one
const user = await User.findOne({ email });

// Find by ID
const user = await User.findById(id);

// Find many
const users = await User.find({ status: 'active' });

// Find with relations
const user = await User.findById(id).populate('products');
```

**After (Prisma):**
```typescript
// Find unique (requires unique field)
const user = await prisma.user.findUnique({
  where: { email },
});

// Find by ID
const user = await prisma.user.findUnique({
  where: { id },
});

// Find many
const users = await prisma.user.findMany({
  where: { status: 'ACTIVE' },
});

// Find with relations
const user = await prisma.user.findUnique({
  where: { id },
  include: { products: true },
});
```

### Pattern 3: Convert Create Operations

**Before (Mongoose):**
```typescript
const user = await User.create({
  name,
  email,
  password,
});
```

**After (Prisma):**
```typescript
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword, // Note: must hash manually
  },
});
```

### Pattern 4: Convert Update Operations

**Before (Mongoose):**
```typescript
const user = await User.findByIdAndUpdate(
  id,
  { name, email },
  { new: true }
);
```

**After (Prisma):**
```typescript
const user = await prisma.user.update({
  where: { id },
  data: { name, email },
});
```

### Pattern 5: Convert Delete Operations

**Before (Mongoose):**
```typescript
await User.findByIdAndDelete(id);
```

**After (Prisma):**
```typescript
await prisma.user.delete({
  where: { id },
});
```

### Pattern 6: Handle Password Hashing

**Before (Mongoose - automatic via pre-save hook):**
```typescript
// Password was hashed automatically in model
const user = await User.create({ password });
```

**After (Prisma - manual):**
```typescript
import { hashPassword } from '../utils/password';

const hashedPassword = await hashPassword(password);
const user = await prisma.user.create({
  data: { password: hashedPassword },
});
```

### Pattern 7: Convert Nested Objects

**Before (Mongoose - embedded documents):**
```typescript
// Service model with nested process steps
const service = await Service.create({
  name,
  process: [
    { title: 'Step 1', description: '...' },
    { title: 'Step 2', description: '...' },
  ],
});
```

**After (Prisma - separate table with relations):**
```typescript
const service = await prisma.service.create({
  data: {
    name,
    processSteps: {
      create: [
        { title: 'Step 1', description: '...', order: 0 },
        { title: 'Step 2', description: '...', order: 1 },
      ],
    },
  },
  include: {
    processSteps: true,
  },
});
```

### Pattern 8: Convert Enum Values

**Before (Mongoose - lowercase strings):**
```typescript
status: 'active' | 'inactive'
role: 'admin' | 'user'
```

**After (Prisma - UPPERCASE enums):**
```typescript
status: 'ACTIVE' | 'INACTIVE'
role: 'ADMIN' | 'USER'

// In code:
{ status: 'ACTIVE', role: 'ADMIN' }
```

### Pattern 9: Convert ID References

**Before (Mongoose - ObjectId):**
```typescript
// String IDs
{ _id: '507f1f77bcf86cd799439011' }
createdBy: mongoose.Types.ObjectId

// References
product: mongoose.Schema.Types.ObjectId
```

**After (Prisma - Integer IDs):**
```typescript
// Integer IDs
{ id: 1, id: 2, id: 3 }
createdBy: number

// References (foreign keys)
createdBy: number // Just the ID, relation defined in schema
```

### Pattern 10: Select/Project Fields

**Before (Mongoose):**
```typescript
const user = await User.findById(id).select('name email -password');
```

**After (Prisma):**
```typescript
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    name: true,
    email: true,
    // password excluded by default
  },
});
```

---

## 🚀 Step-by-Step Controller Conversion

### Example: Product Controller

1. **Update imports:**
```typescript
// Remove
import mongoose from 'mongoose';
import Product, { IProduct } from '../models/product.model';

// Add
import { prisma } from '../lib/prisma';
import { Product, ProductVariant } from '@prisma/client';
```

2. **Convert getAll:**
```typescript
// Before
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ status: 'Active' })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
  res.json(products);
};

// After
export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    include: {
      user: {
        select: { name: true, email: true },
      },
      variants: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(products);
};
```

3. **Convert create:**
```typescript
// Before
export const createProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.user?._id,
  });
  res.status(201).json(product);
};

// After
export const createProduct = async (req: AuthRequest, res: Response) => {
  const { variants, ...productData } = req.body;

  const product = await prisma.product.create({
    data: {
      ...productData,
      createdBy: req.user?.id,
      ...(variants && {
        variants: {
          create: variants,
        },
      }),
    },
    include: {
      variants: true,
    },
  });
  res.status(201).json(product);
};
```

4. **Convert update:**
```typescript
// Before
export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// After
export const updateProduct = async (req: Request, res: Response) => {
  const { variants, ...productData } = req.body;
  const id = parseInt(req.params.id);

  const product = await prisma.product.update({
    where: { id },
    data: productData,
    include: { variants: true },
  });
  res.json(product);
};
```

5. **Convert delete:**
```typescript
// Before
export const deleteProduct = async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

// After
export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  await prisma.product.delete({
    where: { id },
  });
  res.json({ message: 'Product deleted' });
};
```

---

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Database
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your PostgreSQL connection
# For Hetzner server:
DATABASE_URL="postgresql://username:password@localhost:5432/isutech_db?schema=public"
```

### 3. Generate Prisma Client
```bash
npm run prisma:generate
```

### 4. Create Database Tables
```bash
# Push schema to database (development)
npm run prisma:push

# OR create migration (production)
npm run prisma:migrate
```

### 5. Seed Admin User
```bash
npm run seed:admin
```

### 6. Start Development Server
```bash
npm run dev
```

---

## 🎓 Key Differences: Mongoose vs Prisma

| Feature | Mongoose | Prisma |
|---------|----------|--------|
| **IDs** | String (`_id`) | Integer (`id`) by default |
| **Enums** | lowercase strings | UPPERCASE |
| **Nested Data** | Embedded documents | Separate tables with relations |
| **Password Hash** | Automatic (pre-save hook) | Manual |
| **Populate** | `.populate('field')` | `include: { field: true }` |
| **Select** | `.select('field1 field2')` | `select: { field1: true }` |
| **Timestamps** | `{ timestamps: true }` | `@default(now())` + `@updatedAt` |
| **Find by ID** | `findById(stringId)` | `findUnique({ where: { id: intId }})` |

---

## 📝 Checklist for Each Controller

When converting a controller, ensure you:

- [ ] Replace imports (Mongoose → Prisma)
- [ ] Update all find operations
- [ ] Update all create operations
- [ ] Update all update operations
- [ ] Update all delete operations
- [ ] Convert `_id` to `id` (and parse string to int)
- [ ] Convert enum values to UPPERCASE
- [ ] Handle password hashing manually
- [ ] Update nested object creation/updates
- [ ] Use `include` instead of `populate`
- [ ] Use `select` for field projection
- [ ] Test all endpoints

---

## 🚨 Common Pitfalls

1. **Forgetting to parse ID to integer:**
   ```typescript
   // ❌ Wrong
   where: { id: req.params.id }

   // ✅ Correct
   where: { id: parseInt(req.params.id) }
   ```

2. **Forgetting to hash passwords:**
   ```typescript
   // ❌ Wrong (password stored as plaintext!)
   data: { password: req.body.password }

   // ✅ Correct
   import { hashPassword } from '../utils/password';
   const hashedPassword = await hashPassword(req.body.password);
   data: { password: hashedPassword }
   ```

3. **Using lowercase enums:**
   ```typescript
   // ❌ Wrong
   where: { status: 'active' }

   // ✅ Correct
   where: { status: 'ACTIVE' }
   ```

4. **Forgetting to include relations:**
   ```typescript
   // ❌ Missing related data
   const product = await prisma.product.findUnique({ where: { id } });

   // ✅ Include relations
   const product = await prisma.product.findUnique({
     where: { id },
     include: { variants: true, user: true },
   });
   ```

---

## 🎯 Next Steps

1. Convert remaining controllers one by one
2. Update authentication middleware to use Prisma
3. Test all API endpoints
4. Update frontend API calls if needed
5. Deploy to Hetzner server

---

## 📚 Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Questions?** Check the example auth controller at `src/controllers/auth.controller.prisma.ts` for a complete conversion example.
