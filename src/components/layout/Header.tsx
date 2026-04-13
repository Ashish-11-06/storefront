"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-semibold font-serif tracking-wide bg-gradient-to-r from-pink-500 via-rose-500 to-red-600 bg-clip-text text-transparent"
          >
            Rajesh Florals
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-black text-gray-700">
              HOME
            </Link>
            <Link href="/products" className="hover:text-black text-gray-700">
              PRODUCTS
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
            <Link href="/search">
              <Search className="h-5 w-5 cursor-pointer text-gray-700" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <User
                className="h-5 w-5 cursor-pointer text-gray-700"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={open}
              />

              {open && (
                <div className="absolute right-0 mt-3 w-40 bg-white border rounded-lg shadow-md py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    Wishlist
                  </Link>

                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-black"
                    onClick={() => setOpen(false)}
                  >
                    Orders
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                    onClick={() => {
                      setOpen(false);
                      // 🔐 Add logout logic here
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}