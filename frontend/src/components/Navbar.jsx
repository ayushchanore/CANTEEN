// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const { user, admin, userToken, adminToken, logoutUser, logoutAdmin } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userToken) {
      logoutUser();
    }
    if (adminToken) {
      logoutAdmin();
    }
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-white hover:scale-110 transform transition duration-300 flex items-center gap-2">
            <span className="text-4xl">🍔</span>
            <span className="drop-shadow-lg">Canteen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="hover:text-yellow-300 transition font-semibold text-lg hover:scale-110 transform duration-200">
              Home
            </Link>
            <Link to="/menu" className="hover:text-yellow-300 transition font-semibold text-lg hover:scale-110 transform duration-200">
              Menu
            </Link>

            {userToken && (
              <>
                <Link to="/cart" className="hover:text-yellow-300 transition relative font-semibold text-lg hover:scale-110 transform duration-200">
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-yellow-300 transition font-semibold text-lg hover:scale-110 transform duration-200">
                  📦 Orders
                </Link>
              </>
            )}

            {!userToken && !adminToken && (
              <>
                <Link
                  to="/login"
                  className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border-2 border-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-orange-600 transition duration-300 shadow-lg"
                >
                  Sign Up
                </Link>
                <Link
                  to="/admin-login"
                  className="bg-yellow-400 text-orange-600 px-4 py-2 text-sm rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg"
                >
                  🔐 Admin
                </Link>
              </>
            )}

            {(userToken || adminToken) && (
              <>
                {admin && (
                  <Link to="/admin-dashboard" className="hover:text-yellow-300 transition font-semibold text-lg hover:scale-110 transform duration-200">
                    📊 Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700 hover:scale-105 transform transition duration-300 shadow-lg"
                >
                  🚪 Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex gap-4 items-center">
            {userToken && cart.length > 0 && (
              <Link to="/cart" className="relative">
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </Link>
            )}
            <button className="text-accent">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
