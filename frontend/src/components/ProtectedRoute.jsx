// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, type = 'user' }) => {
  const { userToken, adminToken } = useContext(AuthContext);

  if (type === 'user' && !userToken) {
    return <Navigate to="/login" replace />;
  }

  if (type === 'admin' && !adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};
