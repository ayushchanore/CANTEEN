// src/pages/Cart.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CartItem, LoadingSpinner } from '../components';
import { formatPrice } from '../utils/helpers';
import { orderAPI } from '../utils/api';
import { Input, TextArea } from '../components';
import toast from 'react-hot-toast';

export const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    phoneNumber: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.createRazorpayOrder({
        items: cart,
        deliveryAddress: formData.deliveryAddress,
        phoneNumber: formData.phoneNumber,
        notes: formData.notes,
      });

      const { razorpayOrderId, amount, currency, orderItems, totalAmount } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'KDK College Canteen',
        description: 'Food Order Payment',
        order_id: razorpayOrderId,
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await orderAPI.verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              orderItems,
              totalAmount,
              deliveryAddress: formData.deliveryAddress,
              phoneNumber: formData.phoneNumber,
              notes: formData.notes,
            });

            if (verifyResponse.data.success) {
              clearCart();
              toast.success('Payment successful! Order placed 🎉');
              navigate('/orders');
            }
          } catch (error) {
            toast.error('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          contact: formData.phoneNumber,
        },
        theme: {
          color: '#FF6B35',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => toast.error('Payment failed. Please try again.'));
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.createOrder({
        items: cart,
        deliveryAddress: formData.deliveryAddress,
        phoneNumber: formData.phoneNumber,
        notes: formData.notes,
      });
      if (response.data.success) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/orders');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!validateForm()) return;
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handleCOD();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 text-lg mb-8">Start adding some delicious items to your cart!</p>
            <button
              onClick={() => navigate('/menu')}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">🛒 Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem key={item.menuItemId} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="card p-6 sticky top-20 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              {cart.map((item) => (
                <div key={item.menuItemId} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 pb-6 border-b">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Delivery Details</h3>
                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="10-digit phone number"
                  error={errors.phoneNumber}
                  required
                />
                <Input
                  label="Delivery Address"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  error={errors.deliveryAddress}
                  required
                />
                <TextArea
                  label="Special Requests (Optional)"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions..."
                  rows={3}
                />

                {/* Payment Method */}
                <h3 className="font-bold text-lg">Payment Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${paymentMethod === 'razorpay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-orange-500"
                    />
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="font-semibold">Pay Online</p>
                      <p className="text-xs text-gray-500">UPI, Cards, Net Banking</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-orange-500"
                    />
                    <span className="text-2xl">💵</span>
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-xs text-gray-500">Pay at the counter</p>
                    </div>
                  </label>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <LoadingSpinner size="sm" /> : paymentMethod === 'razorpay' ? '💳 Pay Now' : '📦 Place Order'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
