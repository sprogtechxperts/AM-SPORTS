"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

type QuantityMap = {
  [id: string]: number;
};

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const [quantities, setQuantities] = useState<QuantityMap>({});

  useEffect(() => {
    const initialQuantities = cart.reduce((acc: QuantityMap, item) => {
      acc[String(item.id)] = item.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [cart]);

  const handleIncrease = (id: string | number) => {
    setQuantities((prev) => ({
      ...prev,
      [String(id)]: (prev[String(id)] || 1) + 1,
    }));
  };

  const handleDecrease = (id: string | number) => {
    setQuantities((prev) => ({
      ...prev,
      [String(id)]: Math.max(1, (prev[String(id)] || 1) - 1),
    }));
  };

  const total = cart.reduce((sum, item) => {
    const qty = quantities[String(item.id)] || 1;
    const itemPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10);
    return sum + itemPrice * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-8 lg:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6 max-w-4xl mx-auto">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-4 border-gray-700"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded shadow-lg object-cover"
                />
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-green-400">{item.price}</p>
                  <div className="mt-2 flex items-center gap-3 flex-wrap">
                    <span className="text-sm">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-700 px-2 rounded hover:bg-gray-600"
                        onClick={() => handleDecrease(item.id)}
                      >
                        -
                      </button>
                      <span>{quantities[String(item.id)]}</span>
                      <button
                        className="bg-gray-700 px-2 rounded hover:bg-gray-600"
                        onClick={() => handleIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.info(`${item.name} removed from cart.`);
                  }}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">
              Total: <span className="text-green-400">₹{total}</span>
            </h2>

            <div className="flex justify-center flex-wrap gap-4 mt-6">
              <button
                onClick={() => {
                  clearCart();
                  toast.warn("Cart cleared.");
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={() => {
                  if (cart.length === 0) {
                    toast.error("Cart is empty. Add items first.");
                    return;
                  }

                  const firstItem = cart[0];
                  const query = new URLSearchParams({
                    productId: String(firstItem.id),
                    size: firstItem.size || "",
                    color: firstItem.color || "",
                  });

                  router.push(`/checkout?${query.toString()}`);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
