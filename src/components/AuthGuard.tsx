"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<
    "loading" | "authorized" | "unauthorized"
  >("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!token || isLoggedIn !== "true") {
      setStatus("unauthorized");

      // ✅ preserve query params
      const fullPath =
        pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

      router.replace(`/login?redirect=${encodeURIComponent(fullPath)}`);
    } else {
      setStatus("authorized");
    }
  }, [pathname, searchParams]);

  if (status === "loading") return null;
  if (status === "unauthorized") return null;

  return <>{children}</>;
}