// src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaUtensils, FaHome, FaShoppingCart, FaBoxOpen, FaTachometerAlt, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaLock, FaBars, FaTimes } from 'react-icons/fa';

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
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:scale-105 transform transition duration-300">
            <div className="bg-white text-orange-500 p-2 rounded-xl shadow-lg">
              <FaUtensils size={22} />
            </div>
            <span className="text-2xl font-extrabold drop-shadow-lg tracking-wide">KDK Canteen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold text-base">
              <FaHome size={16} /> Home
            </Link>
            <Link to="/menu" className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold text-base">
              <FaUtensils size={16} /> Menu
            </Link>

            {userToken && (
              <>
                <Link to="/cart" className="flex items-center gap-2 hover:text-yellow-300 transition relative font-semibold text-base">
                  <FaShoppingCart size={16} /> Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-3 -right-3 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold text-base">
                  <FaBoxOpen size={16} /> Orders
                </Link>
              </>
            )}

            {!userToken && !adminToken && (
              <>
                <Link to="/login" className="flex items-center gap-2 bg-white text-orange-600 px-5 py-2 rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg">
                  <FaSignInAlt size={15} /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-2 border-2 border-white px-5 py-2 rounded-full font-bold hover:bg-white hover:text-orange-600 transition duration-300">
                  <FaUserPlus size={15} /> Sign Up
                </Link>
                <Link to="/admin-login" className="flex items-center gap-2 bg-yellow-400 text-orange-700 px-4 py-2 text-sm rounded-full font-bold hover:scale-105 transform transition duration-300 shadow-lg">
                  <FaLock size={13} /> Admin
                </Link>
              </>
            )}

            {(userToken || adminToken) && (
              <>
                {admin && (
                  <Link to="/admin-dashboard" className="flex items-center gap-2 hover:text-yellow-300 transition font-semibold text-base">
                    <FaTachometerAlt size={16} /> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 px-5 py-2 rounded-full font-bold hover:bg-red-700 hover:scale-105 transform transition duration-300 shadow-lg">
                  <FaSignOutAlt size={15} /> Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="md:hidden flex items-center gap-3">
            {userToken && cart.length > 0 && (
              <Link to="/cart" className="relative" onClick={closeMenu}>
                <FaShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              </Link>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-2 pb-4 border-t border-white border-opacity-30 pt-4">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 hover:text-yellow-300 font-semibold py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
              <FaHome size={16} /> Home
            </Link>
            <Link to="/menu" onClick={closeMenu} className="flex items-center gap-3 hover:text-yellow-300 font-semibold py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
              <FaUtensils size={16} /> Menu
            </Link>

            {userToken && (
              <>
                <Link to="/cart" onClick={closeMenu} className="flex items-center gap-3 hover:text-yellow-300 font-semibold py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                  <FaShoppingCart size={16} /> Cart
                  {cart.length > 0 && (
                    <span className="bg-yellow-400 text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" onClick={closeMenu} className="flex items-center gap-3 hover:text-yellow-300 font-semibold py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                  <FaBoxOpen size={16} /> Orders
                </Link>
              </>
            )}

            {!userToken && !adminToken && (
              <>
                <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 bg-white text-orange-600 px-4 py-2 rounded-full font-bold justify-center mt-2">
                  <FaSignInAlt size={15} /> Login
                </Link>
                <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 border-2 border-white px-4 py-2 rounded-full font-bold justify-center hover:bg-white hover:text-orange-600 transition">
                  <FaUserPlus size={15} /> Sign Up
                </Link>
                <Link to="/admin-login" onClick={closeMenu} className="flex items-center gap-3 bg-yellow-400 text-orange-700 px-4 py-2 rounded-full font-bold justify-center">
                  <FaLock size={13} /> Admin
                </Link>
              </>
            )}

            {(userToken || adminToken) && (
              <>
                {admin && (
                  <Link to="/admin-dashboard" onClick={closeMenu} className="flex items-center gap-3 hover:text-yellow-300 font-semibold py-2 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition">
                    <FaTachometerAlt size={16} /> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-3 bg-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-700 transition mt-2 justify-center">
                  <FaSignOutAlt size={15} /> Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
