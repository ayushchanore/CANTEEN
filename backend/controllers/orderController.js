// controllers/orderController.js
// Order controller

const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const { sendOrderReadyEmail } = require('../utils/sendEmail');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   GET /api/orders/user
// @desc    Get user orders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.menuItemId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/admin
// @desc    Get all orders (Admin only)
// @access  Private
exports.getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;

    let query = Order.find().populate('userId', 'name email phone');

    if (status) {
      query = query.where('status', status);
    }

    const orders = await query.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/:id
// @desc    Get order details
// @access  Private
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItemId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/orders
// @desc    Create order with COD
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phoneNumber, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    if (!deliveryAddress || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'Delivery address and phone number required' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({ success: false, message: `Menu item not found` });
      }

      totalAmount += menuItem.price * item.quantity;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      paymentStatus: 'Cash on Delivery',
      deliveryAddress,
      phoneNumber,
      notes,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000),
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/orders/razorpay-order
// @desc    Create Razorpay order
// @access  Private
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phoneNumber, notes } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    if (!deliveryAddress || !phoneNumber)
      return res.status(400).json({ success: false, message: 'Delivery address and phone number required' });

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem)
        return res.status(404).json({ success: false, message: 'Menu item not found' });
      totalAmount += menuItem.price * item.quantity;
      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderItems,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      notes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/orders/verify-payment
// @desc    Verify Razorpay payment and create order
// @access  Private
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderItems,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      notes,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature)
      return res.status(400).json({ success: false, message: 'Payment verification failed' });

    // Create order in DB
    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      paymentStatus: 'Completed',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      deliveryAddress,
      phoneNumber,
      notes,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000),
    });

    res.status(201).json({ success: true, message: 'Payment verified and order placed', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Please provide status' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Delete order when status is Delivered
    if (status === 'Delivered') {
      await Order.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Order delivered and removed from history',
        deleted: true,
      });
    }

    order.status = status;
    await order.save();

    // Send email when status is Completed
    if (status === 'Completed') {
      try {
        const user = await User.findById(order.userId);
        if (user) {
          await sendOrderReadyEmail(
            user.email,
            user.name,
            order.items,
            order.totalAmount
          );
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError.message);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order,
      deleted: false,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   DELETE /api/orders/:id
// @desc    Cancel order
// @access  Private
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Can only cancel pending orders' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
