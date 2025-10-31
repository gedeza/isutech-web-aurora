import mongoose from 'mongoose';
import User from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/isutech');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@isutech.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@isutech.com',
      password: 'admin123!@#',
      role: 'admin',
      status: 'Active',
    });

    console.log('Admin user created successfully:', {
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin(); 