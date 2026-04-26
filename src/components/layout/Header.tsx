"use client";

import Link from "next/link";
import { ShoppingCart, User, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_CART } from "@/graphql/queries/cartQueries";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;
  const PLACEHOLDER = "https://via.placeholder.com/50";
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // 🔥 AUTH CHECK
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700); // ⏱ 0.7 seconds

    return () => clearTimeout(handler);
  }, [search]);

  // 🛒 Cart
  const { data: cartData } = useQuery(GET_CART);
  const cartCount = cartData?.myCart?.items?.length || 0;

  // 🔍 Search
  const { data: searchData, loading: searchLoading } = useQuery(GET_PRODUCTS, {
    variables: { search: debouncedSearch, first: 5 },
    skip: debouncedSearch.length < 1,
  });

  const products = searchData?.products?.products || [];
  const categories = searchData?.products?.categories || [];

  const categoryAsProducts = categories.map((cat: any) => ({
    id: `cat-${cat.id}`,
    name: cat.name,
    image: cat.image,
    isCategory: true,
  }));

  const results = [...products, ...categoryAsProducts];

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setOpen(false);

    // ✅ Toast
    toast.success("Logged out successfully!");

    // 👉 small delay for UX
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };
  // Close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // 🔍 SEARCH CLICK
  const handleClick = (item: any) => {
    if (item.isCategory) {
      const categoryId = item.id.replace("cat-", "");
      router.push(`/products?category=${categoryId}`);
    } else {
      const slug = `${item.name.toLowerCase().replace(/\s+/g, "-")}-${item.id}`;
      router.push(`/products/${slug}`);
    }

    setSearch("");
    setShowDropdown(false);
  };

  // Hover dropdown
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="text-3xl font-semibold font-serif tracking-wide bg-gradient-to-r from-pink-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
            Rajesh Florals
          </Link>

          {/* SEARCH */}
          <div className="relative flex-1 max-w-xl" ref={dropdownRef}>

            {/* 🔍 SEARCH ICON */}
           
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            
            <input
              type="text"
              placeholder="Search flowers..."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                setShowDropdown(value.length >= 1);
              }}
              className="w-full border px-4 py-2 rounded-full bg-muted outline-none pl-10"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setShowDropdown(false);
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-black"
              >
                <X size={16} />
              </button>
            )}

            {/* DROPDOWN (unchanged) */}
            {showDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-50">
                {searchLoading ? (
                  <div className="p-2 space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-3 px-3 py-2">
                        <Skeleton className="w-10 h-10" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                ) : results.length > 0 ? (
                  results.map((item: any) => {
                    const image = item.isCategory
                      ? `${BASE_URL}${item.image}`
                      : item?.images?.[0]?.image?.startsWith("http")
                        ? item.images[0].image
                        : `${BASE_URL}${item?.images?.[0]?.image || ""}`;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleClick(item)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="w-10 h-10 relative">
                          <Image
                            src={image || PLACEHOLDER}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <p className="text-sm">{item.name}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-sm text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {/* <Link href="/">HOME</Link> */}
            <Link href="/products">PRODUCTS</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* 🔥 AUTH UI */}
            {isLoggedIn === null ? null : isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <User className="h-5 w-5 cursor-pointer" />

                {open && (
                  <div className="absolute right-0 mt-3 w-40 bg-card border rounded-lg shadow-md py-2 z-50">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-muted">
                      Profile
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 hover:bg-muted">
                      Wishlist
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-muted">
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-destructive hover:bg-muted"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium text-primary">
                LOGIN
              </Link>
            )}

            {/* CART */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
}