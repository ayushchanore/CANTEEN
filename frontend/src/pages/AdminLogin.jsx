// src/pages/AdminLogin.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Input, LoadingSpinner } from '../components';
import { authAPI } from '../utils/api';
import { validateEmail } from '../utils/helpers';
import toast from 'react-hot-toast';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await authAPI.adminLogin(formData);
      loginAdmin(response.data.token, response.data.admin);
      toast.success('Admin login successful!');
      navigate('/admin-dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white flex items-center justify-center py-10 px-4">
      <div className="card p-8 w-full max-w-md bg-gray-900 border border-accent">
        <h1 className="text-3xl font-bold text-center mb-2">Admin Portal</h1>
        <p className="text-gray-300 text-center mb-8">Sign in to manage the canteen</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-gray-800 text-white ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700'
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-gray-800 text-white ${
                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700'
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-secondary py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Admin Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Not an admin?{' '}
            <Link to="/login" className="text-accent font-bold hover:underline">
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
