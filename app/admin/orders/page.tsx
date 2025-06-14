"use client";

import React from "react";
import Link from "next/link";

// Sample mock data
const orders = [
  {
    id: "ORD001",
    customer: "Ravi Kumar",
    items: 3,
    total: "₹1197",
    status: "Processing",
    date: "2025-06-12",
  },
  {
    id: "ORD002",
    customer: "Aisha Patel",
    items: 1,
    total: "₹499",
    status: "Shipped",
    date: "2025-06-10",
  },
  {
    id: "ORD003",
    customer: "Arjun Mehta",
    items: 5,
    total: "₹2395",
    status: "Delivered",
    date: "2025-06-09",
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Orders</h1>

      <div className="overflow-x-auto bg-gray-900 border border-gray-700 rounded-lg">
        <table className="min-w-full table-auto text-sm text-white">
          <thead className="bg-gray-800 text-gray-300 uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-center">Items</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-950 divide-y divide-gray-800">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-800 transition">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3 text-center">{order.items}</td>
                <td className="px-4 py-3 text-right">{order.total}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-600"
                        : order.status === "Shipped"
                        ? "bg-yellow-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{order.date}</td>
                <td className="px-4 py-3 text-center">
                  <Link href={`/admin/orders/${order.id}`}>
  <button className="text-sm bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded">
    View
  </button>
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-8 text-gray-400">No orders found.</p>
        )}
      </div>
    </div>
  );
}
