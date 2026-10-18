import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';
import { hashPassword } from '../utils/password';

dotenv.config();

async function seedAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@isutech.co.za';
    const adminName = process.env.ADMIN_NAME || 'Admin User';
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Never fall back to a default: a known password on a public admin login is an open door.
    if (!adminPassword || adminPassword.length < 12) {
      throw new Error('ADMIN_PASSWORD must be set in .env and be at least 12 characters');
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log(`📧 Email: ${adminEmail}`);
      return;
    }

    // Create admin user
    const hashedPassword = await hashPassword(adminPassword);

    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log('🔑 Password: the ADMIN_PASSWORD from .env (change it after first login)');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin()
  .then(() => {
    console.log('🎉 Seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
