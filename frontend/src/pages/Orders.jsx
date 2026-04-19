// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { OrderCard, LoadingSpinner } from '../components';
import { orderAPI } from '../utils/api';
import { ORDER_STATUSES } from '../utils/constants';
import toast from 'react-hot-toast';
import { FaBoxOpen, FaFilter, FaClipboardList, FaShoppingBag } from 'react-icons/fa';
import { MdPendingActions, MdOutdoorGrill, MdCheckCircle } from 'react-icons/md';

const statusIcons = {
  Pending: <MdPendingActions className="text-yellow-500" size={16} />,
  Preparing: <MdOutdoorGrill className="text-orange-500" size={16} />,
  Completed: <MdCheckCircle className="text-green-500" size={16} />,
};

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders();
        const activeOrders = (response.data.orders || []).filter(
          (order) => order.status !== 'Delivered'
        );
        setOrders(activeOrders);
      } catch (error) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = filter ? orders.filter((o) => o.status === filter) : orders;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaClipboardList className="text-orange-500" /> My Orders
          </h1>
          <p className="text-gray-500 flex items-center gap-2">
            <FaBoxOpen size={14} /> Track your orders and their status
          </p>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-3">
          <FaFilter className="text-orange-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm font-medium"
          >
            <option value="">All Orders</option>
            {Object.values(ORDER_STATUSES).map((status) => (
              <option key={status} value={status}>{status}</option>
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
            <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag size={40} className="text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Found</h2>
            <p className="text-gray-500">
              {filter ? 'No orders found with this status' : "You haven't placed any orders yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
