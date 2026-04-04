import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    background: "#aaa8a8",
    foreground: "#ffffff",
    primary: "#e100ff",
    secondary: "#6c757d",
    radius: "12px",
  });
}