// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { OrderCard, LoadingSpinner } from '../components';
import { orderAPI } from '../utils/api';
import { ORDER_STATUSES } from '../utils/constants';
import toast from 'react-hot-toast';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders();
        // Filter out delivered orders
        const activeOrders = (response.data.orders || []).filter(
          (order) => order.status !== 'Delivered'
        );
        setOrders(activeOrders);
      } catch (error) {
        toast.error('Failed to load orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = filter
    ? orders.filter((order) => order.status === filter)
    : orders;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">My Orders</h1>
          <p className="text-gray-600">Track your orders and their status</p>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Orders</option>
            {Object.values(ORDER_STATUSES).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              {filter ? 'No orders found with this status' : 'No orders yet'}
            </p>
          </div>
        ) : (
          <div>
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
