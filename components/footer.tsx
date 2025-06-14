"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";

export default function FooterSection() {
  const year = new Date().getFullYear();
    const dummySocials = [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div className="space-y-4">
          <Link href="/" className="inline-block" aria-label="Go home">
            <Logo />
          </Link>
          <p className="text-sm text-gray-400">
            AM SPORTS — Delivering high-quality sports gear and apparel for champions in the making.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-100 transition">Home</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-100 transition">Products</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-100 transition">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-100 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
       <div>
      <h4 className="text-white text-lg font-semibold mb-4">Follow Us</h4>
      <ul className="space-y-2 text-sm">
        {dummySocials.map((social) => (
          <li key={social.label}>
            <Link
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-100 transition"
            >
              {social.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {year} AM SPORTS. All rights reserved.
      </div>
    </footer>
  );
}
