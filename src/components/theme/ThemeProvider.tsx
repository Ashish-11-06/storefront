"use client";

import { useEffect } from "react";
import { applyTheme } from "@/lib/apply-theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const res = await fetch("/api/theme"); // change to your backend URL
        const data = await res.json();

        applyTheme(data);

        // Save locally
        localStorage.setItem("theme", JSON.stringify(data));
      } catch (err) {
        console.error("Theme load failed", err);

        // fallback from localStorage
        const saved = localStorage.getItem("theme");
        if (saved) {
          applyTheme(JSON.parse(saved));
        }
      }
    };

    loadTheme();
  }, []);

  return <>{children}</>;
}