import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/isutech';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'sibonga@isutech.co.za';
    const password = 'admin123';

    // Delete existing user if exists
    await User.deleteOne({ email });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const user = new User({
      name: 'Sibonga',
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await user.save();

    console.log('Successfully created admin user');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin(); 