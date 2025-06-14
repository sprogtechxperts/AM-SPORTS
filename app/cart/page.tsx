"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {} as { [key: number]: number })
  );

  const handleIncrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const total = cart.reduce((sum, item) => {
    const qty = quantities[item.id] || 1;
    return sum + parseInt(item.price.replace(/[^\d]/g, "")) * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6 max-w-3xl mx-auto">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 border-gray-700"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded shadow-lg"
                />
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-green-400">{item.price}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-sm">Quantity:</span>
                    <button
                      className="bg-gray-700 px-2 rounded hover:bg-gray-600"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span>{quantities[item.id]}</span>
                    <button
                      className="bg-gray-700 px-2 rounded hover:bg-gray-600"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
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
                onClick={() => router.push("/checkout")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
