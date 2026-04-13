// seedAdmin.js
// Script to create default admin account

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: 'admin@college.com' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    await Admin.create({
      name: 'Admin',
      email: 'admin@college.com',
      password: 'admin123',
      phone: '1234567890',
    });

    console.log('Default admin created successfully');
    console.log('Email: admin@college.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
