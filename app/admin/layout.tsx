import ClientAdminLayout from "./ClientAdmin"; // This is the client-side wrapper
import "@/app/globals.css";

export const metadata = {
  title: "AM SPORTS - Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAdminLayout>{children}</ClientAdminLayout>;
}
