"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ShoppingCart, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import LoginPage from '@/components/LoginPage';
import { allProducts } from '@/lib/allProducts';
import { Product } from '@/lib/type';
import Image from 'next/image';

export default function Header() {
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const loginModalRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const closeLoginPopup = () => setShowLoginPopup(false);

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target as Node)
      ) {
        closeLoginPopup();
      }

      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 relative">
          {/* Logo */}
          <Link href="/" aria-label="Home" className="flex items-center">
            <Logo />
          </Link>

          {/* Search Input */}
          <div className="flex-1 max-w-md w-full relative">
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
                            <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{product.name}</p>
                            <p className="text-sm text-green-600 dark:text-green-400">{product.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-center px-4 py-3 text-gray-500 dark:text-gray-400">No products found.</p>
                )}
              </div>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center md:gap-8 gap-4 shrink-0">
            <Link href="/cart" aria-label="Cart" className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded p-1">
              <ShoppingCart className="md:size-8 size-6" />
            </Link>

            <button
              onClick={() => setShowLoginPopup(true)}
              className="text-black rounded md:px-2 px-1 md:py-1 dark:text-white border border-black dark:border-white hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            ref={loginModalRef}
            className="relative bg-white dark:bg-black p-6 rounded-lg w-full max-w-md mx-4 shadow-xl"
          >
            <button
              className="absolute top-3 right-3 text-black dark:text-white hover:text-red-500"
              onClick={closeLoginPopup}
              aria-label="Close login popup"
            >
              <X className="w-5 h-5" />
            </button>
            <LoginPage onSuccess={closeLoginPopup} />
          </div>
        </div>
      )}
    </>
  );
}
