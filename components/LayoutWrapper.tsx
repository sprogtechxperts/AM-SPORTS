"use client";

import { usePathname } from "next/navigation";
import HeroSection from "@/components/Header";
import FooterSection from "@/components/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <HeroSection />}
      <main>{children}</main>
      {!isAdminRoute && <FooterSection />}
    </>
  );
}
