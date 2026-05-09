"use client";

import Header from "@/components/layout/Header";
import AuthGuard from "@/components/AuthGuard";
import { usePathname } from "next/navigation";

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
      <Header />
      <main>{children}</main>
    </AuthGuard>
  ) : (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}