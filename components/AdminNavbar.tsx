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
   <div className="flex justify-end px-4 py-2">
  <button
    onClick={() => {
      localStorage.removeItem("admin-auth");
      window.location.reload(); // Redirects to login after logout
    }}
    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
  >
    Logout
  </button>
</div>

    </header>
  );
}
