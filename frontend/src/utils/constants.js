// src/utils/constants.js
export const CATEGORIES = ['Food', 'Beverages', 'Snacks', 'Desserts'];

export const ORDER_STATUSES = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  COMPLETED: 'Completed',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const PAYMENT_STATUSES = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
};

export const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Preparing: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Delivered: 'bg-purple-100 text-purple-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export const RUPEE_SYMBOL = '₹';
