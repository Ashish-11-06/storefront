import ProductCard from "@/components/common/ProductCard";
import { PRODUCTS } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // ISR

const categories = [
  { id: 'all', name: 'All Products', count: PRODUCTS.length },
  { id: 'exotic', name: 'Exotic Flowers', count: PRODUCTS.filter(p => p.category === 'exotic').length },
  { id: 'pooja', name: 'Pooja Flowers', count: PRODUCTS.filter(p => p.category === 'pooja').length },
  { id: 'pooja-garlands', name: 'Pooja Garlands', count: PRODUCTS.filter(p => p.category === 'pooja-garlands').length },
  { id: 'festive-torans', name: 'Festive Torans', count: PRODUCTS.filter(p => p.category === 'festive-torans').length },
  { id: 'wedding', name: 'Wedding Specials', count: PRODUCTS.filter(p => p.category === 'wedding').length },
  { id: 'customized', name: 'Customized', count: PRODUCTS.filter(p => p.category === 'customized').length },
];

export default async function ProductsPage() {
  const products = PRODUCTS;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* HEADER */}
      <div className="max-w-8xl mx-auto px-6 py-12 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
          Our Collection
        </p>

        <h1 className="text-3xl lg:text-4xl font-serif text-gray-800">
          All Flower Collections
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 flex gap-10">

        {/* 🌸 SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">

            {/* TITLE */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-gray-300"></div>

              <h3 className="text-sm tracking-[0.35em] text-gray-600 uppercase font-medium">
                Filters
              </h3>
            </div>

            {/* CATEGORIES BOX */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white/60 backdrop-blur-sm">
              <h4 className="text-sm font-medium text-gray-800 mb-4">
                Categories
              </h4>

              <div className="space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={
                      category.id === "all"
                        ? "/products"
                        : `/products?category=${category.id}`
                    }
                    className="flex items-center justify-between text-sm text-gray-600 hover:text-black transition group"
                  >
                    <span className="group-hover:translate-x-1 transition">
                      {category.name}
                    </span>

                    <span className="text-xs text-gray-400">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* PRICE BOX */}
            <div className="border border-gray-200 rounded-xl p-5 bg-white/60 backdrop-blur-sm">
              <h4 className="text-sm font-medium text-gray-800 mb-4">
                Price
              </h4>

              <div className="space-y-3">
                {[
                  "Under ₹500",
                  "₹500 - ₹1000",
                  "₹1000 - ₹2000",
                  "₹2000+"
                ].map((price, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="accent-rose-400 cursor-pointer"
                    />

                    <span className="group-hover:text-black transition">
                      {price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* CLEAR FILTER */}
            <button className="text-xs text-gray-400 hover:text-rose-500 transition">
              Clear Filters
            </button>

          </div>
        </aside>

        {/* 🌼 MAIN */}
        <main className="flex-1">

          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-8">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="text-gray-900 font-medium">
                {products.length}
              </span>{" "}
              products
            </p>

            <Select defaultValue="featured">
              <SelectTrigger className="w-44 rounded-full border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Low to High</SelectItem>
                <SelectItem value="price-high">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* LOAD MORE */}
          <div className="text-center mt-14">
            <Button
              variant="premium"
              className="rounded-full px-6 py-3"
            >
              Load More
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}