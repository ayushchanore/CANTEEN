// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'Beverages',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=300&fit=crop',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    color: 'from-pink-500 to-purple-500',
  },
];

const features = [
  {
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=200&h=200&fit=crop',
    title: 'Lightning Fast',
    desc: 'Get your orders ready in just 15 minutes or less!',
    border: 'border-orange-500',
  },
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop',
    title: 'Fresh & Tasty',
    desc: 'Made fresh daily with premium quality ingredients',
    border: 'border-green-500',
  },
  {
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop',
    title: 'Best Prices',
    desc: "Student-friendly prices that won't break the bank",
    border: 'border-blue-500',
  },
];

export const Home = () => {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Background food image */}
        <img
          src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&h=800&fit=crop"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-40 text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            🍽️ KDK College Canteen
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Delicious Food,<br />
            <span className="text-yellow-300">Delivered Fast</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 font-light opacity-90 max-w-2xl mx-auto">
            Order your favorite meals from the canteen and pick them up fresh and hot!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transform transition duration-300"
            >
              🍽️ Order Now
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition duration-300"
            >
              ✨ Sign Up Free
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: '500+', label: 'Happy Students' },
              { value: '50+', label: 'Menu Items' },
              { value: '15 min', label: 'Avg. Ready Time' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-yellow-300">{stat.value}</p>
                <p className="text-xs font-medium opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <p className="text-center text-gray-500 mb-12 text-base md:text-lg">
          Experience the best food ordering service on campus
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {features.map((feature) => (
            <div key={feature.title} className={`group card overflow-hidden hover:scale-105 transform transition duration-300 border-t-4 ${feature.border}`}>
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 text-gray-800">
            Explore Our Menu
          </h2>
          <p className="text-center text-gray-500 mb-12 text-base md:text-lg">
            Choose from our delicious categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer h-48 md:h-64"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`}></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                  <h3 className="text-white text-xl md:text-2xl font-extrabold drop-shadow-lg">{category.name}</h3>
                  <p className="text-white text-xs opacity-80 mt-1">Tap to explore</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Items Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 text-gray-800">
          Most Popular
        </h2>
        <p className="text-center text-gray-500 mb-12 text-base md:text-lg">
          Students love these items
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: 'Veg Thali', price: '₹60', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop', tag: '🔥 Bestseller' },
            { name: 'Cold Coffee', price: '₹30', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', tag: '⭐ Popular' },
            { name: 'Samosa', price: '₹10', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', tag: '💰 Budget' },
          ].map((item) => (
            <div key={item.name} className="group card overflow-hidden hover:scale-105 transform transition duration-300">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {item.tag}
                </span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <span className="text-orange-600 font-extrabold text-lg">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/menu"
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transform transition duration-300 inline-block"
          >
            View Full Menu →
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative text-white py-16 md:py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=600&fit=crop"
          alt="cta"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Ready to Order?
          </h2>
          <p className="text-lg md:text-2xl mb-10 font-light opacity-90 max-w-xl mx-auto">
            Join thousands of happy students enjoying delicious meals every day!
          </p>
          <Link
            to="/signup"
            className="bg-white text-pink-600 px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition duration-300 inline-block"
          >
            🚀 Get Started Now
          </Link>
        </div>
      </div>

    </div>
  );
};
