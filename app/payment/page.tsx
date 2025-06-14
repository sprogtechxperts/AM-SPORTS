"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allProducts } from "@/lib/allProducts";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");
  const product = allProducts.find((p) => String(p.id) === String(productId));

  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    if (!product) {
      toast.error("Invalid product");
      setTimeout(() => router.push("/"), 2000);
    }
  }, [product, router]);

  if (!product) return null;

  const price = Number(product.price.replace(/[^\d.]/g, "")) || 0;
  const deliveryCharge = 40;
  const discount = 0.2 * price;
  const total = price - discount + deliveryCharge;

  const handlePayment = () => {
    if (selectedMethod === "UPI" && !upiId.trim()) {
      toast.error("Please enter UPI ID");
      return;
    }

    const newOrder = {
      id: "ORD" + Math.floor(1000 + Math.random() * 9000),
      productId: product.id,
      name: product.name,
      imageSrc: product.imageSrc,
      date: new Date().toISOString(),
      price: total,
      status: "Confirmed",
      paymentMethod: selectedMethod,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    toast.success(`Payment successful with ${selectedMethod}`, {
      onClose: () => {
        router.push("/order");
      },
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <ToastContainer position="top-center" />
      <h1 className="text-2xl font-bold mb-6">Choose Payment Method</h1>

      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg space-y-4">
        <div className="flex gap-4">
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={80}
            height={80}
            className="rounded"
          />
          <div>
            <p className="font-semibold">{product.name}</p>
            <p>Price: ₹{price.toFixed(2)}</p>
            <p>Total: ₹{total.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Select Method</h2>
          <div className="space-y-2">
            <label className="block">
              <input
                type="radio"
                value="UPI"
                checked={selectedMethod === "UPI"}
                onChange={() => setSelectedMethod("UPI")}
              />
              <span className="ml-2">UPI</span>
            </label>
            {selectedMethod === "UPI" && (
              <input
                type="text"
                placeholder="Enter your UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-2 p-2 w-full bg-gray-800 rounded"
              />
            )}
            <label className="block">
              <input
                type="radio"
                value="Card"
                checked={selectedMethod === "Card"}
                onChange={() => setSelectedMethod("Card")}
              />
              <span className="ml-2">Credit / Debit Card</span>
            </label>
            <label className="block">
              <input
                type="radio"
                value="NetBanking"
                checked={selectedMethod === "NetBanking"}
                onChange={() => setSelectedMethod("NetBanking")}
              />
              <span className="ml-2">Net Banking</span>
            </label>
            <label className="block">
              <input
                type="radio"
                value="COD"
                checked={selectedMethod === "COD"}
                onChange={() => setSelectedMethod("COD")}
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-4 bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading payment info...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
