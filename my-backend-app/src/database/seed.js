import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    await User.create({
      email: 'admin@adride.com',
      password: await bcrypt.hash('admin123', 12),
      role: 'admin'
    });
  }
};


dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGODB_URI; // Ensure this matches your .env variable name

if (!mongoURI) {
  console.error("❌ MONGODB_URI is not defined. Check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB Connected');
  seedAdmin().then(() => {
    console.log('✅ Admin user seeded');
    mongoose.connection.close();
  }).catch(err => {
    console.error('❌ Error seeding admin user:', err);
    mongoose.connection.close();
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});