import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Providers from "./providers";
import { Toaster } from "sonner"; // 🔥 ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloom & Blossom - Exotic Flowers & Pooja Flowers",
  description:
    "Premium flowers for all occasions - Exotic flowers, Pooja flowers, Festive torans, Wedding specials & Customized orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${inter.variable} 
        h-full antialiased
      `}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full flex flex-col">

        {/* ✅ Apollo Provider */}
        <Providers>

          {/* ✅ Theme */}
          <ThemeProvider>

            {children}

            <Toaster
              position="top-left"
              richColors
              closeButton
              duration={2000}
               offset={{ top: 80}}
            />

          </ThemeProvider>

        </Providers>

      </body>
    </html>
  );
}