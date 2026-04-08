"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-semibold font-serif tracking-wide bg-linear-to-r from-pink-500 via-rose-500 to-red-600 bg-clip-text text-transparent"
          >
            Bloom & Blossom
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-black text-gray-700">
              HOME
            </Link>
            <Link href="/products" className="hover:text-black text-gray-700">
              PRODUCS
            </Link>
            <Link href="/about" className="hover:text-black text-gray-700">
              ABOUT
            </Link>
            <Link href="/contact" className="hover:text-black text-gray-700">
              CONTACT
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <Search className="h-5 w-5 cursor-pointer text-gray-700" />

            {/* User */}
            <User className="h-5 w-5 cursor-pointer text-gray-700" />

            {/* Cart */}
            <div className="relative cursor-pointer">
              <ShoppingCart className="h-5 w-5 text-gray-700" />

              {/* Badge */}
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}