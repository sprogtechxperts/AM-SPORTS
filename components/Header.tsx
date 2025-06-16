"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allProducts } from "@/lib/allProducts";
import { Product } from "@/lib/type";
import Image from "next/image";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 relative">
        {/* Logo and Hamburger */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
          <Link href="/" aria-label="Home" className="flex items-center">
            <Logo />
          </Link>

          <button
            className="md:hidden block text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-black dark:text-white">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Search Input */}
        <div className="flex-1 max-w-md hidden md:block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              className="w-full pl-10 pr-3 py-2 text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-black dark:focus:ring-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
          </div>
          {isFocused && query && (
            <div
              ref={resultsRef}
              className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-auto"
            >
              {results.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => {
                          setQuery("");
                          setIsFocused(false);
                        }}
                      >
                        <div className="relative w-12 h-12">
                          <Image
                            src={product.imageSrc}
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-center px-4 py-3 text-gray-500 dark:text-gray-400">
                  No products found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="md:size-6 size-5 text-black dark:text-white" />
          </Link>

          <Link
            href="/login"
            className="text-black rounded px-3 py-1 dark:text-white border border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-3 text-black dark:text-white text-base">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <div className="mt-3">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full text-black dark:text-white bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
