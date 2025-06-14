"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProducts } from "@/lib/allProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; 



export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const product = allProducts.find((p) => String(p.id) === String(productId));
  if (!product) return notFound();

  const similarProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageSrc: product.imageSrc,
      quantity: 1,
    });
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`);
  };

  
const handleBuyNow = () => {
  if (!selectedColor || !selectedSize) {
    toast.warning("Please select both color and size before purchasing");
    return;
  }

  // Show toast (optional)
  toast.info(`Proceeding to checkout: ${product.name} (${selectedSize}, ${selectedColor})`);

  // Redirect to checkout with query params
  router.push(
    `/checkout?productId=${product.id}&size=${selectedSize}&color=${selectedColor}`
  );
};
  

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 sm:px-6 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: Product Image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square overflow-hidden group rounded-lg">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              fill
              className="object-cover  bg-gray-700 transition-transform duration-300 ease-in-out group-hover:scale-110"
              priority
            />
          </div>
        </div>

        {/* RIGHT: Product Info + Actions (on large screens) */}
        <div className="flex flex-col justify-between">
          <div>
          <span className="flex justify-between items-center py-2">
              <h1 className="text-2xl sm:text-3xl font-bold">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-green-400">
              {product.price}
            </p>
          </span>
            <p className="mb-2">⭐ {product.rating} / 5</p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Color selection */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">Choose Color:</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
                      selectedColor === color
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-gray-500 hover:border-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Select Size:</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 rounded-md text-sm border transition-all ${
                      selectedSize === size
                        ? "bg-gray-700 text-white border-white"
                        : "bg-transparent text-white border-gray-500 hover:border-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex  sm:flex-row gap-4  w-full">
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`md:w-full w-1/2  rounded-md px-6 py-3 text-white font-medium transition-colors text-center ${
                addedToCart
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {addedToCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="md:w-full w-1/2 rounded-md bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-medium transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">
          You may also like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {similarProducts.map((similar) => (
            <Link
              key={similar.id}
              href={`/products/${similar.id}`}
              className="group block bg-gray-900 rounded-md p-3 transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-square mb-2 overflow-hidden rounded">
                <Image
                  src={similar.imageSrc}
                  alt={similar.imageAlt}
                  fill
                  className="rounded object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 line-clamp-2">
                {similar.name}
              </h3>
              <p className="text-green-400 text-sm mt-1">{similar.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 max-w-xs px-6 py-3 rounded-md shadow-lg z-50 bg-green-500 text-white animate-slideInFromRight">
          {toastMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInFromRight {
          animation: slideInFromRight 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
