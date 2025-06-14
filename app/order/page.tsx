"use client";

import { useEffect, useState } from "react";
import { allProducts } from "@/lib/allProducts";
import Image from "next/image";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

type OrderStatus = "Confirmed" | "Cancelled" | "Delivered";

interface Order {
  id: string;
  date: string;
  productId: number;
  status: OrderStatus;
  price: number;
}

const getRandomStatus = (): OrderStatus => {
  const statuses: OrderStatus[] = ["Confirmed", "Cancelled", "Delivered"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [timeFilter, setTimeFilter] = useState<string>("All");

  useEffect(() => {
    const existing = localStorage.getItem("orders");
    if (!existing) {
      const sampleOrders: Order[] = allProducts.slice(0, 5).map((product, i) => ({
        id: "#ord" + (1000 + i),
        date: new Date().toISOString(),
        productId: product.id,
        status:
          i === 0
            ? "Confirmed"
            : i === 1
            ? "Delivered"
            : i === 2
            ? "Cancelled"
            : getRandomStatus(),
        price: parseInt(product.price.replace("\u20B9", "")),
      }));
      localStorage.setItem("orders", JSON.stringify(sampleOrders));
    }
    loadOrders();
  }, []);

  const loadOrders = () => {
    const data: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
  };

  const handleCancel = (orderId: string) => {
    const updated: Order[] = orders.map((o) =>
      o.id === orderId ? { ...o, status: "Cancelled" } : o
    );
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success("Order cancelled successfully.");
    setOrders(updated);
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    const matchTime = (() => {
      if (timeFilter === "All") return true;
      const now = new Date();
      const orderDate = new Date(order.date);
      const diffDays = (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
      switch (timeFilter) {
        case "This Week":
          return diffDays <= 7;
        case "Past Month":
          return diffDays <= 30;
        case "3 Months":
          return diffDays <= 90;
        case "6 Months":
          return diffDays <= 180;
        case "1 Year":
          return diffDays <= 365;
        default:
          return true;
      }
    })();
    return matchStatus && matchTime;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <ToastContainer position="top-center" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Orders</h1>
        <div className="flex flex-wrap gap-4">
          <select
            className="bg-gray-800 p-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>

          <select
            className="bg-gray-800 p-2 rounded"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="All">All Time</option>
            <option value="This Week">This Week</option>
            <option value="Past Month">Past Month</option>
            <option value="3 Months">Last 3 Months</option>
            <option value="6 Months">Last 6 Months</option>
            <option value="1 Year">Last 1 Year</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Order Date</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const product = allProducts.find((p) => p.id === order.productId);
                if (!product) return null;
                return (
                  <tr key={order.id} className="text-center">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2 flex items-center gap-2 justify-center">
                      <Image
                        src={product.imageSrc}
                        width={50}
                        height={50}
                        alt={product.name}
                        className="rounded"
                      />
                      <span className="hidden sm:inline">{product.name}</span>
                    </td>
                    <td className="border p-2">
                      {format(new Date(order.date), "dd MMM yyyy")}
                    </td>
                    <td className="border p-2">₹{order.price}</td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "Cancelled"
                            ? "bg-red-600"
                            : order.status === "Delivered"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="border p-2 space-x-2">
                      <button
                        className="px-2 py-1 rounded bg-red-700 hover:bg-red-800 disabled:opacity-50"
                        onClick={() => {
                          if (order.status === "Confirmed") {
                            handleCancel(order.id);
                          } else {
                            toast.info("Only confirmed orders can be cancelled.");
                          }
                        }}
                        disabled={order.status !== "Confirmed"}
                      >
                        Cancel
                      </button>
                      <Link href={`/order/${order.id}`}>
                        <button className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
