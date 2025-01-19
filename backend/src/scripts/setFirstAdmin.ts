import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/isutech';

async function setFirstAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'sibonga@isutech.co.za';
    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log('Successfully updated user role to admin');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

setFirstAdmin(); 