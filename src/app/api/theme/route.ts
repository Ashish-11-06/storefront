import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    // 🌤️ Light background
    background: "#f8fafc",   // soft white (better than pure white)
    foreground: "#0f172a",   // dark text

    // 🎨 Primary (brand color)
    primary: "#e100ff",      
    primaryForeground: "#ffffff",
    primaryText: "#000000",

    // 🧩 Secondary
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",

    // 🧱 UI surfaces
    card: "#ffffff",
    cardForeground: "#0f172a",

    // ✨ Accent
    accent: "#fdf2ff",
    accentForeground: "#a21caf",

    // 🔲 Borders & inputs
    border: "#e2e8f0",
    input: "#e2e8f0",
    ring: "#e100ff",

    // ⚠️ States
    destructive: "#ef4444",

    // 🎯 Radius
    radius: "12px",
  });
}