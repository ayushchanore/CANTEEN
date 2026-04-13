// src/pages/OrderSuccess.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { orderAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const { clearCart, cart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    const completeOrder = async () => {
      if (!sessionId || cart.length === 0) {
        navigate('/orders');
        return;
      }

      try {
        await orderAPI.completePayment({
          sessionId,
          items: cart,
          deliveryAddress: localStorage.getItem('deliveryAddress') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          notes: localStorage.getItem('notes') || '',
        });

        clearCart();
        toast.success('Order confirmed successfully!');
      } catch (error) {
        toast.error('Failed to confirm order');
        console.error(error);
      }
    };

    completeOrder();
  }, [sessionId, cart, clearCart, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="card p-8 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. You will receive your meal shortly. You can track your order status in the Orders page.
        </p>
        <button
          onClick={() => navigate('/orders')}
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition w-full"
        >
          View Your Orders
        </button>
      </div>
    </div>
  );
};
