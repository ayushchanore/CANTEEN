// src/components/OrderCard.jsx
import React from 'react';
import { formatPrice, formatDate } from '../utils/helpers';
import { STATUS_COLORS } from '../utils/constants';

export const OrderCard = ({ order }) => {
  return (
    <div className="card p-4 mb-4">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-4 pb-3 border-b">
        <div>
          <p className="text-gray-600 text-sm">Order ID</p>
          <p className="font-mono font-bold text-primary">{order._id.slice(-8)}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[order.status]}`}>
          {order.status}
        </div>
        <div>
          <p className="text-gray-600 text-sm">Date</p>
          <p className="text-sm font-semibold">{formatDate(order.createdAt)}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-3">
        {order.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm py-1">
            <span>{item.name} x {item.quantity}</span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      {/* Total and Details */}
      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total Amount</span>
          <span className="text-lg font-bold text-primary">{formatPrice(order.totalAmount)}</span>
        </div>
        <p className="text-gray-600 text-xs">Delivery to: {order.deliveryAddress}</p>
      </div>
    </div>
  );
};
