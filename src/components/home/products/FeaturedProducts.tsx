import ProductCard from "@/components/common/ProductCard";
import { PRODUCTS } from "@/constants/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="relative py-20 bg-[#f8f8f8] overflow-hidden">

      {/* 🌸 Soft Gradient Blobs */}
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

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {featured.map((product) => (
            <div
              key={product.id}
              className="transition-transform duration-300 hover:-translate-y-2"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center md:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-sm tracking-wider text-white bg-black px-6 py-3 rounded-full hover:bg-gray-900 transition-all duration-300 shadow-md "
          >
            View All Products
            <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all duration-300"></span>
          </Link>
        </div>

      </div>
    </section>
  );
}