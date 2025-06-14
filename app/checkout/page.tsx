'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { allProducts } from '@/lib/allProducts';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main Component Content Wrapped in Suspense
function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get("productId");
  const product = allProducts.find((p) => String(p.id) === String(productId));

  const [couponCode, setCouponCode] = useState("AM20");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: "",
    contact: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "Home",
  });

  useEffect(() => {
    if (!product) router.push("/");
  }, [product, router]);

  if (!product) return null;

  const price = parseInt(product.price.replace(/[^\d]/g, ""));
  const deliveryCharge = 40;
  const total = price - discountAmount + deliveryCharge;

  const handleSaveAddress = () => {
    if (
      !userDetails.name ||
      !userDetails.contact.match(/^\d{10}$/) ||
      !userDetails.pincode ||
      !userDetails.locality ||
      !userDetails.address ||
      !userDetails.city ||
      !userDetails.state
    ) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    setAddressSaved(true);
    toast.success("✅ Address saved successfully!");
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "AM20") {
      const discount = 0.2 * price;
      setDiscountAmount(discount);
      toast.success("🎉 Coupon applied! 20% discount added.");
    } else {
      setDiscountAmount(0);
      toast.error("❌ Invalid coupon code.");
    }
  };

  const handleContinueToPayment = () => {
    router.push("/payment?productId=" + productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6 flex flex-col md:flex-row gap-8">
      <ToastContainer position="top-center" />

      {/* Left Side - Address Form */}
      <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

        <div className="space-y-3">
          <input type="text" placeholder="Full Name" className="w-full p-2 rounded bg-gray-800" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} />
          <input type="text" placeholder="Contact Number" className="w-full p-2 rounded bg-gray-800" value={userDetails.contact} onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })} />
          <input type="text" placeholder="Pincode" className="w-full p-2 rounded bg-gray-800" value={userDetails.pincode} onChange={(e) => setUserDetails({ ...userDetails, pincode: e.target.value })} />
          <input type="text" placeholder="Locality" className="w-full p-2 rounded bg-gray-800" value={userDetails.locality} onChange={(e) => setUserDetails({ ...userDetails, locality: e.target.value })} />
          <textarea placeholder="Address (House No, Area)" className="w-full p-2 rounded bg-gray-800" value={userDetails.address} onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}></textarea>
          <input type="text" placeholder="City/District/Town" className="w-full p-2 rounded bg-gray-800" value={userDetails.city} onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })} />
          <input type="text" placeholder="State" className="w-full p-2 rounded bg-gray-800" value={userDetails.state} onChange={(e) => setUserDetails({ ...userDetails, state: e.target.value })} />
          <input type="text" placeholder="Landmark (optional)" className="w-full p-2 rounded bg-gray-800" value={userDetails.landmark} onChange={(e) => setUserDetails({ ...userDetails, landmark: e.target.value })} />
          <input type="text" placeholder="Alternate Phone (optional)" className="w-full p-2 rounded bg-gray-800" value={userDetails.alternatePhone} onChange={(e) => setUserDetails({ ...userDetails, alternatePhone: e.target.value })} />

          <div className="flex gap-4 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" checked={userDetails.addressType === "Home"} onChange={() => setUserDetails({ ...userDetails, addressType: "Home" })} />
              Home (All day delivery)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={userDetails.addressType === "Work"} onChange={() => setUserDetails({ ...userDetails, addressType: "Work" })} />
              Work (10AM - 5PM delivery)
            </label>
          </div>

          <div className="flex justify-between mt-4">
            <button className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700" onClick={() => router.back()}>
              Cancel
            </button>
            <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700" onClick={handleSaveAddress}>
              Save Address & Deliver Here
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      {addressSaved && (
        <div className="flex-1 bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex items-center gap-4 mb-4">
            <Image src={product.imageSrc} alt={product.name} width={100} height={100} className="rounded" />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-300">Delivery: by 4-5 days</p>
              <p className="text-sm">Price: ₹{price}</p>
              <p className="text-sm text-green-400">Discount: ₹{discountAmount.toFixed(2)}</p>
              <p className="text-sm text-yellow-300">Delivery Charges: ₹{deliveryCharge}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="p-2 bg-gray-800 rounded border border-gray-700 w-full"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Apply
            </button>
          </div>

          <h3 className="text-lg font-semibold mt-6">Price Details</h3>
          <div className="text-sm space-y-1 mt-2">
            <p>Price (1 item): ₹{price}</p>
            <p>Discount: -₹{discountAmount.toFixed(2)}</p>
            <p>Delivery Charges: ₹{deliveryCharge}</p>
            <p className="font-bold mt-2 text-lg text-green-400">Total Payable: ₹{total.toFixed(2)}</p>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="font-semibold text-sm mb-2 text-gray-300">Deliver To:</h4>
            <p className="text-sm text-white">
              {userDetails.name}, {userDetails.address}, {userDetails.locality}, {userDetails.city}, {userDetails.state} - {userDetails.pincode}
              <br />
              Contact: {userDetails.contact}
            </p>
          </div>

          <button className="mt-6 w-full bg-green-600 py-2 rounded hover:bg-green-700" onClick={handleContinueToPayment}>
            Continue to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
