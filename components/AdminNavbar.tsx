"use client";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">
        {pathname === "/admin"
          ? "Dashboard"
          : pathname.replace("/admin/", "").replace(/^\w/, c => c.toUpperCase())}
      </h1>
      <div className="text-xl text-gray-300">Welcome, Admin</div>
    </header>
  );
}
