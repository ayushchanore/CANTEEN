// routes/authRoutes.js
// Authentication routes

const express = require('express');
const router = express.Router();
const {
  userSignup,
  userLogin,
  adminSignup,
  adminLogin,
  getUserProfile,
  getAdminProfile,
} = require('../controllers/authController');
const { protectUser, protectAdmin } = require('../middleware/auth');

// User routes
router.post('/user/signup', userSignup);
router.post('/user/login', userLogin);
router.get('/user/me', protectUser, getUserProfile);

// Admin routes
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);
router.get('/admin/me', protectAdmin, getAdminProfile);

module.exports = router;
