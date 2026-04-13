// routes/orderRoutes.js
// Order routes

const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getAllOrders,
  getOrderDetails,
  createOrder,
  createCheckoutSession,
  completePayment,
  updateOrderStatus,
  cancelOrder,
} = require('../controllers/orderController');
const { protectUser, protectAdmin } = require('../middleware/auth');

// User routes
router.get('/user', protectUser, getUserOrders);
router.post('/', protectUser, createOrder);
router.post('/create-checkout-session', protectUser, createCheckoutSession);
router.post('/complete-payment', protectUser, completePayment);
router.delete('/:id', protectUser, cancelOrder);

// Admin routes
router.get('/admin/all', protectAdmin, getAllOrders);
router.put('/:id/status', protectAdmin, updateOrderStatus);

// Common route
router.get('/:id', protectUser, getOrderDetails);

module.exports = router;
