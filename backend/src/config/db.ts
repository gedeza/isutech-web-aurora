import dotenv from 'dotenv';
import { prisma } from '../lib/prisma';

dotenv.config();

/**
 * Test PostgreSQL connection
 */
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected');

    // Test query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection verified');

  } catch (error) {
    console.error('❌ Error connecting to PostgreSQL:', error);
    console.log('⏳ Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
