"use client";

export default function OrderStatusPage() {
  // Just hardcode for testing or fallback
  const status = "success"; // or "failure"

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        {status === "success" ? (
          <h1 className="text-3xl font-bold text-green-500">🎉 Order Placed Successfully!</h1>
        ) : (
          <h1 className="text-3xl font-bold text-red-500">❌ Payment Failed</h1>
        )}
      </div>
    </div>
  );
}
