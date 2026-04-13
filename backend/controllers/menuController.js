// controllers/menuController.js
// Menu item controller

const MenuItem = require('../models/MenuItem');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category } = req.query;

    let query = MenuItem.find({ isAvailable: true });

    if (category) {
      query = query.where('category', category);
    }

    const items = await query.exec();

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/menu
// @desc    Create new menu item (Admin only)
// @access  Private
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, preparationTime } = req.body;

    // Validation
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      preparationTime,
      createdBy: req.admin.id,
    });

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/menu/:id
// @desc    Update menu item (Admin only)
// @access  Private
exports.updateMenuItem = async (req, res) => {
  try {
    let item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/menu/:id
// @desc    Delete menu item (Admin only)
// @access  Private
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/menu/admin/all
// @desc    Get all menu items for admin (including unavailable)
// @access  Private
exports.getAllMenuItemsAdmin = async (req, res) => {
  try {
    const items = await MenuItem.find().select('-__v');

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
