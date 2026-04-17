// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-4 md:left-10 w-40 md:w-72 h-40 md:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-4 md:right-10 w-40 md:w-72 h-40 md:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-40 md:w-72 h-40 md:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl md:text-7xl mb-4 animate-bounce">🍔</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 drop-shadow-lg leading-tight">
             College Canteen
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl mb-8 md:mb-10 font-light px-2">
            Delicious meals delivered to your doorstep ⚡
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              to="/menu"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transform transition duration-300"
            >
              🍽️ Order Now
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition duration-300 shadow-xl"
            >
              ✨ Sign Up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <p className="text-center text-gray-600 mb-10 md:mb-16 text-base md:text-lg">
          Experience the best food ordering service
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          <div className="group card p-8 text-center hover:scale-105 transform transition duration-300 border-t-4 border-orange-500">
            <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Get your orders in just 15 minutes or less!
            </p>
          </div>
          <div className="group card p-8 text-center hover:scale-105 transform transition duration-300 border-t-4 border-green-500">
            <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">
              🍽️
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Fresh & Tasty
            </h3>
            <p className="text-gray-600">
              Made fresh daily with premium ingredients
            </p>
          </div>
          <div className="group card p-8 text-center hover:scale-105 transform transition duration-300 border-t-4 border-blue-500 sm:col-span-2 md:col-span-1">
            <div className="text-6xl mb-4 group-hover:scale-110 transition duration-300">
              💰
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              Best Prices
            </h3>
            <p className="text-gray-600">
              Student-friendly prices that won't break the bank
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 text-gray-800">
            Explore Our Menu
          </h2>
          <p className="text-center text-gray-600 mb-10 md:mb-16 text-base md:text-lg">
            Choose from our delicious categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: "Food", icon: "🍲", color: "from-red-400 to-orange-500" },
              {
                name: "Beverages",
                icon: "🥤",
                color: "from-blue-400 to-cyan-500",
              },
              {
                name: "Snacks",
                icon: "🍕",
                color: "from-yellow-400 to-orange-500",
              },
              {
                name: "Desserts",
                icon: "🍰",
                color: "from-pink-400 to-purple-500",
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name}`}
                className={`card p-6 md:p-10 text-center hover:scale-105 transform transition duration-300 cursor-pointer bg-gradient-to-br ${category.color} text-white shadow-xl`}
              >
                <div className="text-5xl md:text-7xl mb-3 md:mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg md:text-2xl font-bold">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-5xl md:text-6xl mb-4 md:mb-6 animate-bounce">
            🎉
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 drop-shadow-lg">
            Ready to Order?
          </h2>
          <p className="text-lg md:text-2xl mb-8 md:mb-10 font-light px-4">
            Join thousands of happy students enjoying delicious meals!
          </p>
          <Link
            to="/signup"
            className="bg-white text-pink-600 px-10 py-4 rounded-full font-bold text-lg md:text-xl shadow-2xl hover:scale-110 transform transition duration-300 inline-block"
          >
            🚀 Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};
