"use client";

import CategoryFilter from "@/components/products/CategoryFilter";
import ProductsClient from "@/components/home/products/ProductsClient";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryFromUrl = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);

  // 🔥 1. Sync URL → state
  useEffect(() => {
    if (categoryFromUrl) {
      const ids = categoryFromUrl.split(",").map(Number);
      setSelectedCategories(ids);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryFromUrl]);

  // 🔥 2. Handle category change + update URL
  const handleCategoryChange = (selected: number[]) => {
    setSelectedCategories(selected);

    if (selected.length > 0) {
      router.push(`/products?category=${selected.join(",")}`);
    } else {
      router.push(`/products`);
    }
  };

  const handleFilterChange = (value: string | null) => {
    if (!value) return;

    if (value === "All") {
      setSortBy(null);
      setIsFeatured(null);
    } else if (value === "Featured") {
      setIsFeatured(true);
      setSortBy(null);
    } else if (value === "Price-low") {
      setSortBy("low_to_high");
      setIsFeatured(null);
    } else if (value === "Price-high") {
      setSortBy("high_to_low");
      setIsFeatured(null);
    }
  };

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
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-8">
            <h3 className="text-sm uppercase text-gray-600">Filters</h3>

            {/* 🔥 PASS selected */}
            <CategoryFilter
              selected={selectedCategories}
              onChange={handleCategoryChange}
            />
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1">
          {/* SORT */}
          <div className="flex items-center justify-between mb-8">
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-44 rounded-full border-gray-200">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Featured">Featured</SelectItem>
                <SelectItem value="Price-low">Low to High</SelectItem>
                <SelectItem value="Price-high">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PRODUCTS */}
          <ProductsClient
            selectedCategories={selectedCategories}
            sortBy={sortBy}
            isFeatured={isFeatured}
          />

          {/* LOAD MORE */}
          {/* <div className="text-center mt-14">
            <Button className="rounded-full px-6 py-3">Load More</Button>
          </div> */}
        </main>
      </div>
    </div>
  );
}
