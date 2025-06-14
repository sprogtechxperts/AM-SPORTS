"use client";

import { useParams } from "next/navigation";
import React from "react";

const mockOrders = [
  {
    id: "ORD001",
    customer: "Ravi Kumar",
    items: 3,
    total: "₹1197",
    status: "Processing",
    date: "2025-06-12",
    expectedDelivery: "2025-06-17",
    products: [
      { name: "Shirt", quantity: 2, price: "₹798" },
      { name: "Cap", quantity: 1, price: "₹399" },
    ],
    progress: 1, 
  },
  
];

const progressStages = ["Ordered", "Packed", "Shipped", "Delivered"];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const order = mockOrders.find((o) => o.id === id);

  if (!order)
    return <p className="text-center text-white py-10">Order not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Order Details - {order.id}</h1>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Order Date:</strong> {order.date}</p>
        <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> {order.total}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Delivery Progress</h2>
      <div className="flex justify-between items-center mb-6">
        {progressStages.map((stage, index) => (
          <div
            key={stage}
            className={`flex-1 text-center ${
              index <= order.progress ? "text-green-400" : "text-gray-500"
            }`}
          >
            <div
              className={`w-6 h-6 mx-auto rounded-full ${
                index <= order.progress ? "bg-green-500" : "bg-gray-600"
              }`}
            ></div>
            <p className="text-sm mt-1">{stage}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">Ordered Products</h2>
      <div className="space-y-4">
        {order.products.map((product, i) => (
          <div
            key={i}
            className="bg-gray-800 p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-400">Qty: {product.quantity}</p>
            </div>
            <p className="font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
