// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(false);

  // Update tokens in localStorage
  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', userToken);
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
    } else {
      localStorage.removeItem('adminToken');
    }
  }, [adminToken]);

  const loginUser = (token, userData) => {
    setUserToken(token);
    setUser(userData);
  };

  const logoutUser = () => {
    setUserToken(null);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('cart');
  };

  const loginAdmin = (token, adminData) => {
    setAdminToken(token);
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    setAdmin(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        userToken,
        adminToken,
        loading,
        setLoading,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
