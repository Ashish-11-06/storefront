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
        </div>

      </div>
    </section>
  );
}