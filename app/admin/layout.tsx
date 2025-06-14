// app/admin/layout.tsx
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/Adminsidebar";
import "@/app/globals.css";

export const metadata = {
  title: "AM SPORTS - Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
