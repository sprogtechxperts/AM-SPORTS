'use client';
import React from 'react';
import ProductCard from './ProductCard'; // Make sure this path is correct

const OurProducts = () => {
  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10">
          Our Products
        </h2>

        {/* Product Cards */}
        <ProductCard showAll={false} />

        {/* View All Button */}
        <div className="mt-10">
          <a
            href="/products"
            className="inline-block rounded-md bg-yellow-500 px-6 py-2 text-sm font-medium text-black hover:bg-yellow-600 transition"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
