require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB on every request (serverless safe)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server only in local dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
