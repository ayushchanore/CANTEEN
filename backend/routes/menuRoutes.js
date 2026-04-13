// routes/menuRoutes.js
// Menu item routes

const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItemsAdmin,
} = require('../controllers/menuController');
const { protectAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);

// Admin routes
router.post('/', protectAdmin, createMenuItem);
router.put('/:id', protectAdmin, updateMenuItem);
router.delete('/:id', protectAdmin, deleteMenuItem);
router.get('/admin/all', protectAdmin, getAllMenuItemsAdmin);

module.exports = router;
