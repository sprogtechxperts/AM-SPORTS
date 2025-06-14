"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/sales", label: "Sales" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-3">
        {adminLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "block px-4 py-2 rounded hover:bg-gray-700 transition",
              pathname === href ? "bg-blue-600 font-semibold" : ""
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
