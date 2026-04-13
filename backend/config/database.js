// config/database.js
// MongoDB connection configuration

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {  
  if (isConnected) {
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-canteen';
    const db = await mongoose.connect(mongoURI);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
