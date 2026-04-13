// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Input, TextArea, Select, LoadingSpinner } from '../components';
import { menuAPI, orderAPI } from '../utils/api';
import { CATEGORIES, ORDER_STATUSES } from '../utils/constants';
import { formatPrice, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { admin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('menu'); // menu or orders
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    preparationTime: '15',
  });
  const [orderFilter, setOrderFilter] = useState('');

  // Fetch menu items
  useEffect(() => {
    if (activeTab === 'menu') {
      fetchMenuItems();
    } else {
      fetchOrders();
    }
  }, [activeTab, orderFilter]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAllItemsAdmin();
      setItems(response.data.items || []);
    } catch (error) {
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders(orderFilter);
      setOrders(response.data.orders || []);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.image) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      if (editingItem) {
        await menuAPI.updateItem(editingItem._id, formData);
        toast.success('Item updated successfully');
      } else {
        await menuAPI.createItem(formData);
        toast.success('Item added successfully');
      }
      fetchMenuItems();
      setShowAddModal(false);
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        preparationTime: '15',
      });
    } catch (error) {
      toast.error(editingItem ? 'Failed to update item' : 'Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      await menuAPI.deleteItem(id);
      toast.success('Item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      toast.error('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      preparationTime: item.preparationTime.toString(),
    });
    setShowAddModal(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await orderAPI.updateOrderStatus(orderId, { status: newStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {admin?.name || 'Admin'}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'menu'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manage Menu
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'orders'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manage Orders
          </button>
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div>
            <button
              onClick={() => {
                setEditingItem(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  image: '',
                  preparationTime: '15',
                });
                setShowAddModal(true);
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition mb-6"
            >
              + Add New Item
            </button>

            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div key={item._id} className="card p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-primary font-bold">{formatPrice(item.price)}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{item.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <select
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-6"
            >
              <option value="">All Orders</option>
              {Object.values(ORDER_STATUSES).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-600 py-20">No orders found</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="card p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div>
                        <p className="text-gray-600 text-sm">Order ID</p>
                        <p className="font-mono font-bold">{order._id.slice(-8)}</p>
                        <p className="text-gray-600 text-sm mt-2">Customer</p>
                        <p className="font-semibold">{order.userId?.name}</p>
                        <p className="text-gray-600 text-sm">{order.userId?.phone}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Items</p>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-sm">
                              {item.name} x {item.quantity}
                            </p>
                          ))}
                        </div>
                        <p className="font-bold mt-2">{formatPrice(order.totalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {Object.values(ORDER_STATUSES).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <p className="text-gray-600 text-xs mt-2">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={editingItem ? 'Edit Item' : 'Add New Item'}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Biryani"
            required
          />
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Product description"
            rows={3}
            required
          />
          <Input
            label="Price (₹)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={CATEGORIES}
            required
          />
          <Input
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          <Input
            label="Preparation Time (minutes)"
            type="number"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleInputChange}
            required
          />
          <button
            onClick={handleAddItem}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </Modal>
    </div>
  );
};
