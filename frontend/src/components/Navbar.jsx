// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const { user, admin, userToken, adminToken, logoutUser, logoutAdmin } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (userToken) logoutUser();
    if (adminToken) logoutAdmin();
    navigate('/');
    window.location.reload();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="text-3xl font-extrabold text-white flex items-center gap-2 hover:scale-105 transform transition duration-300">
            <span className="text-4xl">🍔</span>
            <span className="drop-shadow-lg">Canteen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="hover:text-yellow-300 transition font-semibold text-lg">Home</Link>
            <Link to="/menu" className="hover:text-yellow-300 transition font-semibold text-lg">Menu</Link>

            {userToken && (
              <>
                <Link to="/cart" className="hover:text-yellow-300 transition relative font-semibold text-lg">
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-yellow-300 transition font-semibold text-lg">📦 Orders</Link>
              </>
            )}

            {!userToken && !adminToken && (
              <>
                <Link to="/login" className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg">Login</Link>
                <Link to="/signup" className="border-2 border-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-orange-600 transition duration-300">Sign Up</Link>
                <Link to="/admin-login" className="bg-yellow-400 text-orange-600 px-4 py-2 text-sm rounded-full font-bold hover:scale-105 transform transition duration-300">🔐 Admin</Link>
              </>
            )}

            {(userToken || adminToken) && (
              <>
                {admin && (
                  <Link to="/admin-dashboard" className="hover:text-yellow-300 transition font-semibold text-lg">📊 Dashboard</Link>
                )}
                <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700 hover:scale-105 transform transition duration-300 shadow-lg">
                  🚪 Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-3">
            {userToken && cart.length > 0 && (
              <Link to="/cart" className="relative" onClick={closeMenu}>
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-3xl font-bold focus:outline-none"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4 border-t border-white border-opacity-30 pt-4">
            <Link to="/" onClick={closeMenu} className="hover:text-yellow-300 font-semibold text-lg py-2">🏠 Home</Link>
            <Link to="/menu" onClick={closeMenu} className="hover:text-yellow-300 font-semibold text-lg py-2">🍽️ Menu</Link>

            {userToken && (
              <>
                <Link to="/cart" onClick={closeMenu} className="hover:text-yellow-300 font-semibold text-lg py-2 relative inline-flex items-center gap-2">
                  🛒 Cart
                  {cart.length > 0 && (
                    <span className="bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" onClick={closeMenu} className="hover:text-yellow-300 font-semibold text-lg py-2">📦 Orders</Link>
              </>
            )}

            {!userToken && !adminToken && (
              <>
                <Link to="/login" onClick={closeMenu} className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-center">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="border-2 border-white px-6 py-2 rounded-full font-bold text-center hover:bg-white hover:text-orange-600 transition">Sign Up</Link>
                <Link to="/admin-login" onClick={closeMenu} className="bg-yellow-400 text-orange-600 px-4 py-2 rounded-full font-bold text-center">🔐 Admin</Link>
              </>
            )}

            {(userToken || adminToken) && (
              <>
                {admin && (
                  <Link to="/admin-dashboard" onClick={closeMenu} className="hover:text-yellow-300 font-semibold text-lg py-2">📊 Dashboard</Link>
                )}
                <button onClick={handleLogout} className="bg-red-600 px-6 py-2 rounded-full font-bold hover:bg-red-700 transition text-left">
                  🚪 Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
