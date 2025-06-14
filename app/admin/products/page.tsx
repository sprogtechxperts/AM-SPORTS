"use client";

import { useState } from "react";
import Link from "next/link";
import { allProducts } from "@/lib/allProducts";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const truncate = (text: string, limit: number = 50) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  return (
    <div className="space-y-6 max-h-screen overflow-hidden p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Manage Products</h1>
        <Link href="/admin/products/add">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition text-white font-medium">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product name..."
        className="w-full md:w-1/3 px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Product Cards */}
      <div className="overflow-y-auto p-5" style={{ maxHeight: "calc(100vh - 200px)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/edit/${product.id}`}
              className="bg-gray-900 text-white rounded-xl shadow flex flex-col hover:ring-2 ring-blue-600 transition cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-80 overflow-hidden rounded-t-xl">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={250}
                  height={250}
                  className="w-full h-full object-contain bg-gray-700 p-2"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col p-4">
                <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                <p className="text-sm text-gray-400 mb-2">
                  {truncate(product.description, 50)}
                </p>

                <div className="text-sm space-y-1 mb-4">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Price:</strong> {product.price}</p>
                  <p><strong>Rating:</strong> ⭐ {product.rating}</p>
                </div>

                <div className="flex justify-between gap-2 mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info(`Redirecting to edit product ID ${product.id}`);
                      window.location.href = `/admin/products/edit/${product.id}`;
                    }}
                    className="bg-blue-600 hover:bg-blue-700 transition text-sm px-3 py-1 rounded text-white w-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success(`Deleted product "${product.name}"`);
                      // Add actual deletion logic here if needed
                    }}
                    className="bg-red-600 hover:bg-red-700 transition text-sm px-3 py-1 rounded text-white w-full"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-400 col-span-full text-center">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
