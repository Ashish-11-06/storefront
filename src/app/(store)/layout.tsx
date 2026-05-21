"use client";

import Header from "@/components/layout/Header";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";
import TopAnnouncementBar from "@/components/common/TopAnnouncementBar";
export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const protectedRoutes = [
    "/cart",
    "/order-summary",
    "/orders",
    "/profile",
    "/wishlist",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return isProtected ? (
    <AuthGuard>
      <TopAnnouncementBar />
      <Header />
      <main>{children}</main>
    </AuthGuard>
  ) : (
    <>
      <TopAnnouncementBar />
      <Header />
      <main>{children}</main>
    </>
  );
}