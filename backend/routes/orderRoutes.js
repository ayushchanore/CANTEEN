// routes/orderRoutes.js
// Order routes

const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getAllOrders,
  getOrderDetails,
  createOrder,
  createRazorpayOrder,
  verifyPayment,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');

const { protectUser, protectAdmin } = require('../middleware/auth');

// User routes
router.get('/user', protectUser, getUserOrders);
router.post('/', protectUser, createOrder);
router.post('/razorpay-order', protectUser, createRazorpayOrder);
router.post('/verify-payment', protectUser, verifyPayment);
router.delete('/:id', protectUser, cancelOrder);

// Admin routes
router.get('/admin/all', protectAdmin, getAllOrders);
router.put('/:id/status', protectAdmin, updateOrderStatus);

// Common route
router.get('/:id', protectUser, getOrderDetails);

module.exports = router;
