// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar, ProtectedRoute } from './components';
import {
  Home,
  Menu,
  Cart,
  Orders,
  Login,
  Signup,
  AdminLogin,
  AdminDashboard,
  OrderSuccess,
} from './pages';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/order-success" element={<OrderSuccess />} />

            {/* Protected User Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute type="user">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute type="user">
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute type="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notification Container */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#FF6B35',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF4757',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
