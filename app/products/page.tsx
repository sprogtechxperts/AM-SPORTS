"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/allProducts";
import { categories } from "@/lib/allProducts";
import { Product } from "@/lib/type";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | null>(null);

 const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true;
    const priceMatch = parseFloat(product.price.replace("₹", "")) <= maxPrice;
    return categoryMatch && priceMatch;
  });

  if (sortOrder === "lowToHigh") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.price.replace("₹", "")) - parseFloat(b.price.replace("₹", ""))
    );
  } else if (sortOrder === "highToLow") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.price.replace("₹", "")) - parseFloat(a.price.replace("₹", ""))
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-10">
      <h1 className="text-3xl text-center font-bold text-white mb-8">All Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full bg-gray-900 rounded-lg p-6 sticky top-10 h-fit">
          {/* Price Filter */}
          <h2 className="text-white text-xl font-semibold mb-2">Filter by Price</h2>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-white mt-2 mb-6">Max Price: ₹{maxPrice}</p>

          {/* Sort */}
          <h2 className="text-white text-xl font-semibold mb-4">Sort By</h2>
          <div className="flex flex-col gap-2 mb-6">
            <button
              onClick={() => setSortOrder("lowToHigh")}
              className={`px-4 py-2 rounded-md text-left text-white ${
                sortOrder === "lowToHigh" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => setSortOrder("highToLow")}
              className={`px-4 py-2 rounded-md text-left text-white ${
                sortOrder === "highToLow" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Price: High to Low
            </button>
          </div>

          {/* Categories */}
          <h2 className="text-white text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`w-full px-4 py-2 rounded-md text-sm text-white text-left ${
                  cat === selectedCategory ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Section - scrollable */}
        <div className="lg:w-3/4 w-full max-h-[100vh] overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800">
          {filteredProducts.length > 0 ? (
            <ProductCardWrapper products={filteredProducts} />
          ) : (
            <p className="text-white text-center mt-10">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const ProductCardWrapper = ({ products }: { products: Product[] }) => {
  return <ProductCard products={products} showAll={true} />;
};
