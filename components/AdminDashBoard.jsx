"use client";

import { BarChart2, ShoppingCart, Package, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Products */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-300">Total Products</h2>
            <Package className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">8</p>
        </div>

        {/* Orders */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-300">Orders</h2>
            <ShoppingCart className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">152</p>
        </div>

        {/* Sales */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-300">Sales</h2>
            <TrendingUp className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-white">₹45,200</p>
        </div>

        {/* Pending Shipments */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-300">Pending Shipments</h2>
            <BarChart2 className="h-5 w-5 text-pink-500" />
          </div>
          <p className="text-3xl font-bold text-white">12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="pb-3">
            🛒 New order placed by <span className="font-bold text-white">Suraj</span> – ₹999
          </li>
          <li className="pb-3">
            ➕ Product <span className="font-bold text-white">Soccer Jersey</span> added
          </li>
          <li className=" pb-3">
            🔐 User <span className="font-bold text-white">admin@gmail.com</span> logged in
          </li>
          <li>
            ✅ Order #1023 marked as <span className="text-green-400 font-bold">shipped</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
