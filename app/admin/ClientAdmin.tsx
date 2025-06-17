"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Adminsidebar";
import AdminNavbar from "@/components/AdminNavbar";
import AdminLogin from "@/components/AdminLogin";

export default function ClientAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    setIsLoggedIn(auth === "true");
    setLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("admin-auth", "true");
    setIsLoggedIn(true);
  };

  if (loading) return null;

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-800 text-gray-200">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
