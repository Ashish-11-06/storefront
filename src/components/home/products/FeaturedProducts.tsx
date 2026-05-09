<<<<<<< HEAD
export default function FeaturedProducts() {
  return (
    <section className="mt-28 px-4 sm:px-6 lg:px-8 flex flex-col w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our <span className="text-[#F59E0B]">Best Sellers</span></h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Curated floral arrangements for ceremonies, everyday rituals, and grand celebrations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pl-2 pr-2">
        {/* Card 1 */}
        <div className="group relative rounded-[2.5rem] bg-white border border-gray-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
          <div className="relative h-80 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549492196-857c28c89da4?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1C1917] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Subscription</span>
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-[#F59E0B] transition-colors tracking-tight">Everyday Puja</h3>
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Get a pristine daily supply of marigolds, roses, and mixed petals perfectly curated for your spiritual rituals.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-gray-900">₹44 <span className="text-sm text-gray-400 font-medium">/ day</span></span>
              <button className="bg-gray-900 text-white hover:bg-[#F59E0B] font-bold py-3.5 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative rounded-[2.5rem] bg-white border border-gray-100 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
          <div className="relative h-80 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#BE123C] to-[#E11D48] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Premium</span>
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-[#BE123C] transition-colors tracking-tight">Festive & Wedding</h3>
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Lush bespoke garlands, floral setups, and breathtaking torans exclusively hand-crafted for grand celebrations.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-gray-900">Custom <span className="text-sm text-gray-400 font-medium">Pricing</span></span>
              <button className="bg-[#BE123C] text-white hover:bg-gray-900 font-bold py-3.5 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-md shadow-rose-900/20">
                Explore Store
              </button>
            </div>
          </div>
=======
"use client";

import { useQuery } from "@apollo/client/react";
import { GET_FILTERED_PRODUCTS } from "@/graphql/queries/productFilterQueries";
import ProductCard from "@/components/common/ProductCard";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedProducts() {
  const { data, loading, error, refetch, networkStatus } = useQuery(
    GET_FILTERED_PRODUCTS,
    {
      variables: {
        first: 4,
        isFeatured: true,
        search: "",
        after: null,
      },

      // ✅ ALWAYS GET FRESH DATA
      fetchPolicy: "network-only",

      // ✅ Allow refetch UI updates
      notifyOnNetworkStatusChange: true,
    }
  );

  const products = data?.products?.products || [];

  return (
    <section className="relative py-20 bg-[#f8f8f8] overflow-hidden">

      {/* 🌸 Background */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-pink-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-rose-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
              Our Collection
            </p>

            <h2 className="text-3xl lg:text-4xl font-serif text-gray-800 leading-snug">
              Featured Flowers
            </h2>

            <p className="text-gray-600 mt-3 text-base">
              Discover our most loved fresh blooms and handcrafted arrangements
            </p>
          </div>

          {/* Desktop CTA */}
          <Link
            href="/products"
            className="hidden md:inline-flex group items-center gap-3 text-sm tracking-wider text-white bg-black px-6 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md"
          >
            View All Products
            <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300"></span>
          </Link>
        </div>

        {/* LOADING */}
        {(loading || networkStatus === 4) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-[260px] rounded-xl bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-full bg-gray-300 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-10 space-y-3">
            <p className="text-red-500">{error.message}</p>

            {/* ✅ Retry */}
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {products.map((product: any) => (
              <div
                key={product.id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            No featured products available
          </p>
        )}

        {/* Mobile CTA */}
        <div className="text-center md:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-sm tracking-wider text-white bg-black px-6 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md"
          >
            View All Products
            <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300"></span>
          </Link>
>>>>>>> main
        </div>

      </div>
    </section>
  );
}