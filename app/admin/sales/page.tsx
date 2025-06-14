"use client";

import React from "react";

export default function AdminSalesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Sales Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
          <p className="text-2xl font-bold">₹75,320</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Orders This Month</h2>
          <p className="text-2xl font-bold">146</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Refunds</h2>
          <p className="text-2xl font-bold">₹1,520</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-8">
        <ul className="list-disc pl-5 space-y-2">
          <li>Sport Shirt – 38 units</li>
          <li>Running Shoes – 25 units</li>
          <li>Baseball Cap – 21 units</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="overflow-x-auto bg-gray-900 border border-gray-700 rounded-lg">
        <table className="min-w-full table-auto text-sm text-white">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            <tr>
              <td className="px-4 py-2">ORD001</td>
              <td className="px-4 py-2">Ravi Kumar</td>
              <td className="px-4 py-2">₹1197</td>
              <td className="px-4 py-2">Processing</td>
            </tr>
            <tr>
              <td className="px-4 py-2">ORD002</td>
              <td className="px-4 py-2">Aisha Patel</td>
              <td className="px-4 py-2">₹499</td>
              <td className="px-4 py-2">Shipped</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
