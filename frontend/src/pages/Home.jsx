// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 text-7xl animate-bounce">🍔</div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">KDK College Canteen</h1>
          <p className="text-2xl md:text-3xl mb-10 font-light">
            Delicious meals delivered to your doorstep ⚡
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/menu"
              className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transform transition duration-300 hover:shadow-orange-500/50"
            >
              🍽️ Order Now
            </Link>
            <Link
              to="/signup"
              className="border-3 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition duration-300 shadow-xl"
            >
              ✨ Sign Up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Why Choose Us?</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">Experience the best food ordering service</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="group card p-10 text-center hover:scale-105 transform transition duration-300 border-t-4 border-orange-500">
            <div className="text-7xl mb-6 group-hover:scale-110 transition duration-300">⚡</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Lightning Fast</h3>
            <p className="text-gray-600 text-lg">Get your orders in just 15 minutes or less!</p>
          </div>
          <div className="group card p-10 text-center hover:scale-105 transform transition duration-300 border-t-4 border-green-500">
            <div className="text-7xl mb-6 group-hover:scale-110 transition duration-300">🍽️</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Fresh & Tasty</h3>
            <p className="text-gray-600 text-lg">Made fresh daily with premium ingredients</p>
          </div>
          <div className="group card p-10 text-center hover:scale-105 transform transition duration-300 border-t-4 border-blue-500">
            <div className="text-7xl mb-6 group-hover:scale-110 transition duration-300">💰</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Best Prices</h3>
            <p className="text-gray-600 text-lg">Student-friendly prices that won't break the bank</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-gray-800">Explore Our Menu</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Choose from our delicious categories</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Food', icon: '🍲', color: 'from-red-400 to-orange-500' },
              { name: 'Beverages', icon: '🥤', color: 'from-blue-400 to-cyan-500' },
              { name: 'Snacks', icon: '🍕', color: 'from-yellow-400 to-orange-500' },
              { name: 'Desserts', icon: '🍰', color: 'from-pink-400 to-purple-500' }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name}`}
                className={`card p-10 text-center hover:scale-110 transform transition duration-300 cursor-pointer bg-gradient-to-br ${category.color} text-white shadow-2xl`}
              >
                <div className="text-7xl mb-4 animate-pulse">{category.icon}</div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">Ready to Order?</h2>
          <p className="text-2xl mb-10 font-light">
            Join thousands of happy students enjoying delicious meals!
          </p>
          <Link
            to="/signup"
            className="bg-white text-pink-600 px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition duration-300 inline-block hover:shadow-pink-500/50"
          >
            🚀 Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};
