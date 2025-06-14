"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { allProducts } from "@/lib/allProducts";
import { format } from "date-fns";
import Image from "next/image";

type OrderStatus = "Confirmed" | "Cancelled" | "Delivered";

interface Order {
  id: string;
  date: string;
  productId: number;
  status: OrderStatus;
  price: number;
}

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const allOrders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");
    const found = allOrders.find((o) => o.id === orderId);
    if (found) {
      setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-lg">Order not found.</p>
      </div>
    );
  }

  const product = allProducts.find((p) => p.id === order.productId);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-lg">Product not found for this order.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-32 h-32 relative">
            <Image
              src={product.imageSrc}
              alt={product.name}
              width={128}
              height={128}
              className="rounded object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p><strong>Product:</strong> {product.name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ₹{order.price}</p>
          </div>
        </div>

        <hr className="border-gray-600" />

        <div className="space-y-2">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {format(new Date(order.date), "dd MMM yyyy")}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                order.status === "Cancelled"
                  ? "bg-red-600"
                  : order.status === "Delivered"
                  ? "bg-green-600"
                  : "bg-yellow-600"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
