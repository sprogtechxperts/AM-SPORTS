'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { allProducts } from '@/lib/allProducts';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CheckoutClientPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = searchParams.get('productId');
  const product = allProducts.find((p) => String(p.id) === String(productId));

  const [couponCode, setCouponCode] = useState('AM20');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);

  const [userDetails, setUserDetails] = useState({
    name: '',
    contact: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    addressType: 'Home',
  });

  useEffect(() => {
    if (!productId || !product) {
      router.replace('/');
    }
  }, [product, productId, router]);

  if (!product) return null;

  const price = parseInt(product.price.replace(/[^\d]/g, ''));
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
      toast.error('Please fill all required fields correctly.');
      return;
    }
    setAddressSaved(true);
    toast.success('✅ Address saved successfully!');
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'AM20') {
      const discount = 0.2 * price;
      setDiscountAmount(discount);
      toast.success('🎉 Coupon applied! 20% discount added.');
    } else {
      setDiscountAmount(0);
      toast.error('❌ Invalid coupon code.');
    }
  };

  const handleContinueToPayment = () => {
    router.push(`/payment?productId=${productId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 sm:px-8">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Address Form */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-4">
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Contact Number', key: 'contact' },
              { label: 'Pincode', key: 'pincode' },
              { label: 'Locality', key: 'locality' },
              { label: 'Address (House No, Area)', key: 'address', textarea: true },
              { label: 'City/District/Town', key: 'city' },
              { label: 'State', key: 'state' },
              { label: 'Landmark (Optional)', key: 'landmark' },
              { label: 'Alternate Phone (Optional)', key: 'alternatePhone' },
            ].map(({ label, key, textarea }) => (
              <div key={key}>
                <label className="text-sm block mb-1">{label}</label>
                {textarea ? (
                  <textarea
                    className="w-full p-2 bg-gray-800 rounded"
                    value={userDetails[key as keyof typeof userDetails]}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, [key]: e.target.value })
                    }
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-800 rounded"
                    value={userDetails[key as keyof typeof userDetails]}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, [key]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}

            <div className="flex items-center gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={userDetails.addressType === 'Home'}
                  onChange={() =>
                    setUserDetails({ ...userDetails, addressType: 'Home' })
                  }
                />
                Home (All day delivery)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={userDetails.addressType === 'Work'}
                  onChange={() =>
                    setUserDetails({ ...userDetails, addressType: 'Work' })
                  }
                />
                Work (10AM - 5PM delivery)
              </label>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                onClick={handleSaveAddress}
              >
                Save Address & Deliver Here
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg sticky top-8 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="flex gap-4 items-start mb-4">
            <Image
              src={product.imageSrc}
              alt={product.name}
              width={100}
              height={100}
              className="rounded object-cover"
            />
            <div className="text-sm">
              <p className="font-semibold text-base">{product.name}</p>
              <p className="text-gray-400">Delivery: in 4–5 days</p>
              <p className="mt-1">Price: ₹{price}</p>
              <p className="text-green-400">
                Discount: ₹{discountAmount.toFixed(2)}
              </p>
              <p className="text-yellow-400">Delivery: ₹{deliveryCharge}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>

          <div className="text-sm space-y-1 mb-4">
            <p>Price (1 item): ₹{price}</p>
            <p>Discount: -₹{discountAmount.toFixed(2)}</p>
            <p>Delivery Charges: ₹{deliveryCharge}</p>
            <hr className="border-gray-700 my-2" />
            <p className="font-bold text-lg text-green-400">
              Total: ₹{total.toFixed(2)}
            </p>
          </div>

          {!addressSaved ? (
            <p className="text-yellow-500 text-sm text-center mt-4">
              🚚 Please save your address to proceed.
            </p>
          ) : (
            <>
              <div className="mt-4 text-sm">
                <h4 className="text-gray-400 font-medium mb-1">Deliver To:</h4>
                <p className="leading-relaxed">
                  {userDetails.name}, {userDetails.address}, {userDetails.locality},{' '}
                  {userDetails.city}, {userDetails.state} - {userDetails.pincode}
                  <br />
                  Contact: {userDetails.contact}
                </p>
              </div>

              <button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded"
                onClick={handleContinueToPayment}
              >
                Continue to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
