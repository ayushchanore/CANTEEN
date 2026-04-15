// controllers/orderController.js
// Order controller

const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

// @route   POST /api/orders/create-checkout-session
// @desc    Create Stripe checkout session
// @access  Private
exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, deliveryAddress, phoneNumber, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    if (!deliveryAddress || !phoneNumber) {
      return res.status(400).json({ success: false, message: 'Delivery address and phone number required' });
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, message: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to .env file' });
    }

    // Calculate total
    let totalAmount = 0;
    const lineItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({ success: false, message: `Menu item ${item.menuItemId} not found` });
      }

      totalAmount += menuItem.price * item.quantity;

      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: menuItem.name,
            description: menuItem.description,
          },
          unit_amount: Math.round(menuItem.price * 100), // Convert to paise
        },
        quantity: item.quantity,
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        userId: req.user.id,
        deliveryAddress,
        phoneNumber,
        notes: notes || '',
      },
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   POST /api/orders/complete-payment
// @desc    Complete payment and create order
// @access  Private
exports.completePayment = async (req, res) => {
  try {
    const { sessionId, items, deliveryAddress, phoneNumber, notes } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    // Calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);

      if (!menuItem) {
        return res.status(404).json({ success: false, message: `Menu item ${item.menuItemId} not found` });
      }

      totalAmount += menuItem.price * item.quantity;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });
    }

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      stripeSessionId: sessionId,
      paymentStatus: 'Completed',
      deliveryAddress,
      phoneNumber,
      notes,
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
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
